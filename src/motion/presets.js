// for v-motion
// consistent reveal animations
const EASE = [0.22, 1, 0.36, 1]; // easing for fade-in animation
const DURATION = 700; // duration of the fade-in animation in ms

// Base fade + slide-up, plays once when the element enters the viewport
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE },
  },
};

// Same as fadeUp but with a per-index delay so lists reveal one after another
export function fadeUpStaggered(index, step = 90, baseDelay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    visibleOnce: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATION,
        delay: baseDelay + index * step,
        ease: EASE,
      },
    },
  };
}

// Fade + slide-up that plays once on mount (not on scroll).
export function enterUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION, delay, ease: EASE },
    },
  };
}

// enterUp with a per-index delay, for staggered lists on mount
export function enterUpStaggered(index, step = 90, baseDelay = 0) {
  return enterUp(baseDelay + index * step);
}
