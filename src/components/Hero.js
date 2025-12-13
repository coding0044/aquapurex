import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
const Hero = ({ scrollToId }) => {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [floating, setFloating] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const animationRef = useRef(null);
    const autoRotateRef = useRef(true);
    const currentRotationRef = useRef(0);

    // Drag / pointer refs
    const draggingRef = useRef(false);
    const lastPointerRef = useRef({ x: 0, y: 0, time: 0 });
    const velocityRef = useRef({ vx: 0, vy: 0 });

    // Targets for smooth interpolation
    const targetRotateXRef = useRef(0);
    const targetRotateYRef = useRef(0);

    // animation loop
    useEffect(() => {
        let lastTime = 0;
        const animate = (currentTime) => {
            if (!lastTime) lastTime = currentTime;
            const delta = currentTime - lastTime;
            lastTime = currentTime;

            // floating
            const floatVal = Math.sin(currentTime * 0.0012) * 6;
            setFloating(floatVal);

            // auto-rotate when allowed
            if (autoRotateRef.current && !draggingRef.current) {
                const rotationSpeed = 0.02;
                currentRotationRef.current += rotationSpeed * delta;
                if (currentRotationRef.current >= 360) currentRotationRef.current -= 360;
                targetRotateYRef.current = currentRotationRef.current;
            }

            // inertia handling after drag
            if (!autoRotateRef.current && !draggingRef.current) {
                targetRotateYRef.current += velocityRef.current.vx * (delta / 16);
                targetRotateXRef.current += velocityRef.current.vy * (delta / 16);

                velocityRef.current.vx *= 0.95;
                velocityRef.current.vy *= 0.95;

                if (Math.abs(velocityRef.current.vx) < 0.01 && Math.abs(velocityRef.current.vy) < 0.01) {
                    autoRotateRef.current = true;
                    currentRotationRef.current = targetRotateYRef.current % 360;
                }
            }

            // easing toward targets
            const ease = 0.14;
            setRotateX(prev => {
                const next = prev + (targetRotateXRef.current - prev) * ease;
                return Math.abs(next) < 0.001 ? 0 : next;
            });
            setRotateY(prev => {
                const next = prev + (targetRotateYRef.current - prev) * ease;
                return next;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current);
    }, []);

    // pointer handlers (works for mouse + touch)
    const handlePointerDown = (e) => {
        const pointX = e.clientX ?? (e.touches && e.touches[0].clientX);
        const pointY = e.clientY ?? (e.touches && e.touches[0].clientY);

        draggingRef.current = true;
        setIsHovering(true);
        autoRotateRef.current = false;
        velocityRef.current = { vx: 0, vy: 0 };

        lastPointerRef.current = { x: pointX, y: pointY, time: performance.now() };
        targetRotateXRef.current = rotateX;
        targetRotateYRef.current = rotateY;
    };

    const handlePointerMove = (e) => {
        // if not dragging, apply subtle hover tilt based on pointer pos over container
        if (!draggingRef.current) {
            const el = e.currentTarget;
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateLimit = 10;
            const hoverY = ((x / rect.width) - 0.5) * rotateLimit * 2;
            const hoverX = ((0.5 - y / rect.height) * rotateLimit * 2);
            targetRotateXRef.current = hoverX * 0.5;
            targetRotateYRef.current = currentRotationRef.current + hoverY * 0.5;
            setIsHovering(true);
            return;
        }

        const pointX = e.clientX ?? (e.touches && e.touches[0].clientX);
        const pointY = e.clientY ?? (e.touches && e.touches[0].clientY);

        const last = lastPointerRef.current;
        const now = performance.now();
        const dt = Math.max(1, now - last.time);
        const dx = pointX - last.x;
        const dy = pointY - last.y;

        const sensitivity = 0.25;
        targetRotateYRef.current += dx * sensitivity * 0.15;
        targetRotateXRef.current += dy * sensitivity * 0.08;
        targetRotateXRef.current = Math.max(-25, Math.min(25, targetRotateXRef.current));

        velocityRef.current.vx = (dx / dt) * 0.6;
        velocityRef.current.vy = (dy / dt) * 0.3;

        lastPointerRef.current = { x: pointX, y: pointY, time: now };
    };

    const handlePointerUp = () => {
        draggingRef.current = false;
        setIsHovering(false);
        autoRotateRef.current = false; // will re-enable when inertia decays
        currentRotationRef.current = targetRotateYRef.current % 360;
    };

    const handleMouseLeave = () => {
        if (!draggingRef.current) {
            setIsHovering(false);
            autoRotateRef.current = true;
            targetRotateXRef.current = 0;
        }
    };

    // global up listener
    useEffect(() => {
        const onUp = () => {
            if (draggingRef.current) handlePointerUp();
        };
        window.addEventListener('pointerup', onUp);
        window.addEventListener('touchend', onUp);
        return () => {
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('touchend', onUp);
        };
    }, []);

    // dynamic shadow params
    const shadowOffsetX = Math.sin(rotateY * Math.PI / 180) * 18;
    const shadowOffsetY = Math.abs(rotateX) * 6 + 10;
    const shadowBlur = 40 + Math.abs(rotateY) * 0.6;

    return (
        <section
            id="hero"
            className="hero"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2rem',
                gap: '2rem',
                overflow: 'hidden'
            }}
        >
            {/* Left content unchanged */}
            <div className="herosection" style={{ maxWidth: '600px' }}>
                <div className="eyebrow" style={{ fontWeight: 'bold', color: '#005faf', marginBottom: '0.5rem' }}>
                    Premium Mineral Water
                </div>
                <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.02 }}>
                    Pure Water. <span className="hero-highlight" >Advanced Technology.</span><br />
                    Trusted by Families.
                </h1>
                <p className="hero-text" style={{ fontSize: '1.15rem', marginBottom: '1.5rem', color: '#333' }}>
                    AquaPureX delivers clean, great-tasting water for your home and office. We purify every drop with RO + UV and balanced minerals.
                </p>

                <div className="heroCta" style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        className="ctaPrimary"
                        onClick={() => scrollToId('order')}
                        style={{
                            padding: '1rem 2rem',
                            borderRadius: '12px',
                            background: '#005faf',
                            color: '#fff',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                            transition: 'transform 0.18s ease, box-shadow 0.18s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Order Now
                    </button>
                    <button
                        className="ctaOutline"
                        onClick={() => scrollToId('process')}
                        style={{
                            padding: '1rem 2rem',
                            borderRadius: '12px',
                            background: 'transparent',
                            color: '#005faf',
                            border: '2px solid #005faf',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            transition: 'transform 0.18s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        See How We Purify
                    </button>
                </div>
            </div>

            {/* Right section now holds TWO synchronized bottles (left & right) */}
            <div
                className="hero-right"

                style={{
                    perspective: '1000px',
                    flex: '1',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    gap: '2rem',
                    minHeight: '360px'
                }}
            >
                {/* label */}


                {/* container for the two bottles */}
                <div style={{
                    display: 'flex', marginTop: '49px',
                    alignItems: 'center', gap: '2rem', transformStyle: 'preserve-3d'
                }}>
                    {/* Left bottle */}
                    <div
                        className="bottle-left"
                        style={{
                            display: 'inline-block',
                            borderRadius: '20px',
                            boxShadow: '0 15px 35px rgba(19, 134, 250, 0.97)',
                            padding: '10px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            willChange: 'transform, box-shadow',
                            cursor: isHovering ? 'grabbing' : 'grab',
                            userSelect: 'none',
                        }}

                    >

                    </div>

                    {/* Right bottle (mirrored slightly so they face each other) */}
                    <div
                        className="bottle-right"
                        style={{

                            display: 'inline-block',
                            marginTop: '-63px',
                            borderRadius: '20px',
                            padding: '10px',
                            background: 'rgba(255,255,255,0.02)',
                            boxShadow: '0 15px 35px rgba(19, 134, 250, 0.97)',
                            willChange: 'transform, box-shadow',
                            cursor: isHovering ? 'grabbing' : 'grab',
                            userSelect: 'none'
                        }}


                    >
                        <img
                            src="/images/360/bottle-360/frame_000.jpg"
                            alt="AquaPureX Bottle Right"
                            style={{
                                width: '466px',
                                height: 'auto',
                                display: 'block',
                                width: '491px',

                                borderRadius: '16px',
                                // flip the image so mirrored container works nicely
                            }}
                            draggable={false}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
