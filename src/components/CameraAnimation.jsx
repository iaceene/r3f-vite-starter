import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";

export const CameraAnimation = () => {
  const { camera } = useThree();
  const animationRef = useRef({
    progress: 0,
    stage: 0, // 0 = first animation, 1 = pause, 2 = second animation, 3 = done
    startPos: { x: 0, y: 0, z: 0 },
    endPos: { x: 0, y: 0, z: 0 },
    duration: 3000, // milliseconds per animation
    pauseDuration: 500, // pause between animations
    startTime: 0,
  });

  useEffect(() => {
    // Define animation keyframes
    const keyframes = [
      {
        start: { x: -0.0, y: 679.11, z: 0.0 },
        end: { x: -0.0, y: 170.01, z: 0.0 },
      },
      {
        start: { x: -0.0, y: 170.01, z: 0.0 },
        end: { x: -62.42, y: 48.46, z: 288.26 },
      },
    ];

    // Set initial camera position
    camera.position.set(keyframes[0].start.x, keyframes[0].start.y, keyframes[0].start.z);

    // Initialize animation
    animationRef.current.startPos = keyframes[0].start;
    animationRef.current.endPos = keyframes[0].end;
    animationRef.current.startTime = Date.now();
    animationRef.current.keyframes = keyframes;
  }, [camera]);

  useFrame(() => {
    const anim = animationRef.current;
    if (anim.stage >= 3) return; // Animation complete

    // Handle pause between animations
    if (anim.stage === 1) {
      const elapsed = Date.now() - anim.startTime;
      if (elapsed >= anim.pauseDuration) {
        // Move to second animation
        anim.stage = 2;
        const next = anim.keyframes[1];
        anim.startPos = next.start;
        anim.endPos = next.end;
        anim.startTime = Date.now();
      }
      return;
    }

    const elapsed = Date.now() - anim.startTime;
    const progress = Math.min(elapsed / anim.duration, 1);

    // Interpolate position
    camera.position.x = anim.startPos.x + (anim.endPos.x - anim.startPos.x) * easeInOutQuad(progress);
    camera.position.y = anim.startPos.y + (anim.endPos.y - anim.startPos.y) * easeInOutQuad(progress);
    camera.position.z = anim.startPos.z + (anim.endPos.z - anim.startPos.z) * easeInOutQuad(progress);

    // Move to next stage when complete
    if (progress >= 1) {
      if (anim.stage === 0) {
        anim.stage = 1; // Enter pause
        anim.startTime = Date.now();
      } else if (anim.stage === 2) {
        anim.stage = 3; // Animation complete
      }
    }

    camera.updateProjectionMatrix();
  });

  return null;
};

// Easing function for smooth animation
const easeInOutQuad = (t) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};
