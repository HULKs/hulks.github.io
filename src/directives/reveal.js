// for v-reveal
// fades content in when scrolled into view.
const DURATION = 700; // duration of the fade-in animation in ms
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"; // easing for fade-in animation
const DEFAULT_THRESHOLD = 0.05; // default threshold for IntersectionObserver (5% of the element is visible)
const DEFAULT_ROOT_MARGIN = "0px 0px -5% 0px"; // default root margin for IntersectionObserver (5% from the bottom of the viewport)
const SAFETY_TIMEOUT_MS = 1200; // safety timeout to ensure the element becomes visible even if IntersectionObserver never fires

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const observers = new WeakMap();
const timers = new WeakMap();

// normalize the directive value into a consistent object shape
function normalize(value) {
  const raw =
    typeof value === "number"
      ? { delay: value }
      : value && typeof value === "object"
        ? value
        : {};
  return {
    delay: Number.isFinite(raw.delay) ? raw.delay : 0,
    threshold: Number.isFinite(raw.threshold)
      ? raw.threshold
      : DEFAULT_THRESHOLD,
    rootMargin:
      typeof raw.rootMargin === "string" ? raw.rootMargin : DEFAULT_ROOT_MARGIN,
    y: Number.isFinite(raw.y) ? raw.y : 24,
    duration: Number.isFinite(raw.duration) ? raw.duration : DURATION,
  };
}

// apply initial styles to the element before it is revealed
function applyInitial(el, opts) {
  el.style.opacity = "0";
  el.style.transform = `translate3d(0, ${opts.y}px, 0)`;
  el.style.willChange = "opacity, transform";
}

// apply visible styles to the element when it is revealed
function applyVisible(el, opts) {
  el.style.transition =
    `opacity ${opts.duration}ms ${EASE} ${opts.delay}ms, ` +
    `transform ${opts.duration}ms ${EASE} ${opts.delay}ms`;
  el.style.opacity = "1";
  el.style.transform = "translate3d(0, 0, 0)";
}

// v-reveal directive: orchestrates the reveal animation using IntersectionObserver
export const revealDirective = {
  mounted(el, binding) {
    const opts = normalize(binding.value);

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    applyInitial(el, opts);
    let released = false;
    const reveal = () => {
      if (released) return;
      released = true;
      applyVisible(el, opts);
      const obs = observers.get(el);
      if (obs) {
        obs.disconnect();
        observers.delete(el);
      }
      const timer = timers.get(el);
      if (timer) {
        clearTimeout(timer);
        timers.delete(el);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            break;
          }
        }
      },
      { threshold: opts.threshold, rootMargin: opts.rootMargin },
    );

    observer.observe(el);
    observers.set(el, observer);

    // Safety fallback, guarantee the element becomes visible even when the IntersectionObserver never fires
    timers.set(el, setTimeout(reveal, SAFETY_TIMEOUT_MS));
  },
  unmounted(el) {
    const observer = observers.get(el);
    if (observer) {
      observer.disconnect();
      observers.delete(el);
    }
    const timer = timers.get(el);
    if (timer) {
      clearTimeout(timer);
      timers.delete(el);
    }
    observers.delete(el);
  },
};

export default {
  install(app) {
    app.directive("reveal", revealDirective);
  },
};
