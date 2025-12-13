/* 3D Card Effects */
.card-3d {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.card-3d-inner {
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
}

.card-3d:hover .card-3d-inner {
  transform: rotateY(10deg) rotateX(5deg) translateZ(20px);
}

.card-3d-front,
.card-3d-back {
  backface-visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
}

.card-3d-back {
  transform: rotateY(180deg);
  background: linear-gradient(135deg, var(--navy), var(--primary-dark));
  color: white;
  border-radius: var(--radius-md);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 3D Button Effects */
.btn-3d {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

.btn-3d::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.1);
  border-radius: inherit;
  transform: translateZ(-5px);
  transition: transform 0.3s ease;
}

.btn-3d:hover {
  transform: translateY(-2px) translateZ(5px);
}

.btn-3d:hover::before {
  transform: translateZ(-8px);
}

.btn-3d:active {
  transform: translateY(1px) translateZ(0);
}

.btn-3d:active::before {
  transform: translateZ(-3px);
}

/* 3D Bottle Container */
.bottle-container-3d {
  transform-style: preserve-3d;
  perspective: 2000px;
}

.bottle-3d {
  transform: rotateY(-20deg) rotateX(10deg);
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.3));
}

.bottle-container-3d:hover .bottle-3d {
  transform: rotateY(0deg) rotateX(0deg) scale(1.05);
}

/* 3D Water Effect */
.water-fill {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.water-fill::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 191, 255, 0.3) 0%,
    rgba(0, 95, 175, 0.6) 100%
  );
  transform: translateY(100%);
  animation: waterRise 2s ease-out forwards;
}

@keyframes waterRise {
  to {
    transform: translateY(0);
  }
}

/* 3D Flip Card */
.flip-card {
  background-color: transparent;
  perspective: 1000px;
  height: 200px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: var(--radius-md);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flip-card-back {
  background: linear-gradient(135deg, var(--primary), var(--navy));
  color: white;
  transform: rotateY(180deg);
}

/* Parallax Scrolling Effect */
.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  transform: translateZ(-1px) scale(2);
  z-index: -1;
}