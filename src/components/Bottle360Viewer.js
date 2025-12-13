// Bottle360Viewer.jsx
import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Props:
 *  - folder: string (path to images, e.g. "/images/bottle-360/")
 *  - frameCount: number (e.g. 72)
 *  - filePrefix: string (default 'frame_')
 *  - fileExt: string (default 'jpg')
 *  - autoPlay: boolean
 *  - autoSpeed: number (frames/sec)
 *  - onProgress: fn(loadedCount, total)
 *  - className: string
 */
const Bottle360Viewer = ({
      folder="/images/360/bottle-360/",
  frameCount = 72,
  filePrefix = 'frame_',
  fileExt = 'jpg',
  autoPlay = false,
  autoSpeed = 6,
  onProgress = () => {},
  className = '',
  initialFrame = 0,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(0);
  const [current, setCurrent] = useState(initialFrame % frameCount);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const autoplayRef = useRef(autoPlay);
  const autoTimerRef = useRef(0);

  // Preload images
  useEffect(() => {
    let mounted = true;
    const imgs = new Array(frameCount);
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const idx = String(i).padStart(3, '0');
      const src = `${folder}${filePrefix}${idx}.${fileExt}`;
      const img = new Image();
      img.src = src;
      img.draggable = false;
      img.onload = () => {
        loadedCount++;
        onProgress(loadedCount, frameCount);
        if (!mounted) return;
        setLoaded(loadedCount);
        // store in array for drawing later
        imgs[i] = img;
        // when all loaded, setImages
        if (loadedCount === frameCount) {
          setImages(imgs.slice());
        }
      };
      img.onerror = () => {
        // still count error as loaded to avoid hang
        loadedCount++;
        onProgress(loadedCount, frameCount);
        imgs[i] = null;
        if (loadedCount === frameCount && mounted) setImages(imgs.slice());
      };
    }

    return () => mounted = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder, frameCount, filePrefix, fileExt]);

  // Draw current frame to canvas
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    const ctx = canvas && canvas.getContext && canvas.getContext('2d');
    if (!canvas || !ctx || images.length === 0) return;
    const img = images[frameIndex];
    if (!img) {
      // clear or draw fallback
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    // maintain aspect ratio and fit center
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.width;
    const ih = img.height;
    const scale = Math.min(cw / iw, ch / ih);
    const w = iw * scale;
    const h = ih * scale;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, w, h);
  }, [images]);

  // Resize canvas to container
  useEffect(() => {
    const resize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      // choose desired pixel ratio for crispness
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * ratio);
      canvas.height = Math.floor(rect.height * ratio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      // redraw
      drawFrame(current);
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('orientationchange', resize);
    return () => {
      ro.disconnect();
      window.removeEventListener('orientationchange', resize);
    };
  }, [drawFrame, current]);

  // draw when images or current changes
  useEffect(() => {
    drawFrame(current);
  }, [drawFrame, current, images]);

  // Animation loop for inertia / autorepeat
  useEffect(() => {
    let last = performance.now();
    function tick(now) {
      const dt = now - last;
      last = now;
      // inertia
      if (!draggingRef.current) {
        // apply velocity to current
        if (Math.abs(velocityRef.current) > 0.001) {
          let next = current + velocityRef.current * (dt / 16);
          // wrap
          next = ((Math.round(next) % frameCount) + frameCount) % frameCount;
          setCurrent(Math.round(next));
          // decay velocity
          velocityRef.current *= 0.92;
        } else {
          velocityRef.current = 0;
        }
      }
      // autoplay (if enabled)
      if (autoplayRef.current) {
        autoTimerRef.current += dt;
        const frameDuration = 1000 / autoSpeed;
        if (autoTimerRef.current >= frameDuration) {
          const steps = Math.floor(autoTimerRef.current / frameDuration);
          autoTimerRef.current -= steps * frameDuration;
          setCurrent(prev => (prev + steps) % frameCount);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [current, frameCount, autoSpeed]);

  // pointer handlers
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const pointerDown = (e) => {
      draggingRef.current = true;
      lastXRef.current = (e.touches ? e.touches[0].clientX : e.clientX);
      velocityRef.current = 0;
      lastTimeRef.current = performance.now();
      container.classList.add('is-dragging');
    };
    const pointerMove = (e) => {
      if (!draggingRef.current) return;
      const x = (e.touches ? e.touches[0].clientX : e.clientX);
      const dx = x - lastXRef.current;
      const now = performance.now();
      const dt = Math.max(1, now - lastTimeRef.current);
      // sensitivity: how many pixels per frame step (adjustable)
      const sensitivity = 6; // smaller => faster rotation
      const deltaFrames = dx / sensitivity;
      lastXRef.current = x;
      lastTimeRef.current = now;
      // update current frame
      setCurrent(prev => {
        let next = prev - Math.round(deltaFrames);
        next = ((next % frameCount) + frameCount) % frameCount;
        return next;
      });
      // compute velocity (frames per 16ms)
      velocityRef.current = (deltaFrames) / (dt / 16);
    };
    const pointerUp = () => {
      draggingRef.current = false;
      container.classList.remove('is-dragging');
      // velocityRef already set; will decay in animation loop
    };

    // mouse
    container.addEventListener('mousedown', pointerDown);
    window.addEventListener('mousemove', pointerMove);
    window.addEventListener('mouseup', pointerUp);
    // touch
    container.addEventListener('touchstart', pointerDown, { passive: true });
    window.addEventListener('touchmove', pointerMove, { passive: true });
    window.addEventListener('touchend', pointerUp);

    // keyboard
    const keyHandler = (ev) => {
      if (ev.key === 'ArrowLeft') setCurrent(prev => (prev - 1 + frameCount) % frameCount);
      if (ev.key === 'ArrowRight') setCurrent(prev => (prev + 1) % frameCount);
      if (ev.key === ' ' || ev.key === 'Spacebar') {
        // toggle autoplay
        autoplayRef.current = !autoplayRef.current;
      }
    };
    container.addEventListener('keydown', keyHandler);

    return () => {
      container.removeEventListener('mousedown', pointerDown);
      window.removeEventListener('mousemove', pointerMove);
      window.removeEventListener('mouseup', pointerUp);

      container.removeEventListener('touchstart', pointerDown);
      window.removeEventListener('touchmove', pointerMove);
      window.removeEventListener('touchend', pointerUp);

      container.removeEventListener('keydown', keyHandler);
    };
  }, [frameCount]);

  // expose simple API: allow toggling autoplay via prop change
  useEffect(() => {
    autoplayRef.current = autoPlay;
  }, [autoPlay]);

  return (
    <div
      ref={containerRef}
      className={`bottle360-container ${className}`}
      tabIndex={0}
      style={{ touchAction: 'pan-y' }}
      aria-label="360 degree product viewer"
    >
      <canvas ref={canvasRef} className="bottle360-canvas" />
      {/* optional UI overlay */}
      <div className="bottle360-ui">
        <div className="frames-loaded">
          {loaded}/{frameCount} frames
        </div>
        <div className="frame-indicator">#{String(current).padStart(3, '0')}</div>
      </div>
    </div>
  );
};

export default Bottle360Viewer;
