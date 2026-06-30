// design/shared/motion/motion.scroll.ts

export function mountMotionScroll(): void {
  if (typeof window === "undefined" || document.body.dataset.mScrollInit) return;
  document.body.dataset.mScrollInit = "";

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          // Play enter animation
          const enterAnim = el.getAttribute("data-m-enter");
          if (enterAnim) {
            el.removeAttribute("data-m-hidden");
            el.setAttribute("data-m-played", "true");
            
            // Force a reflow to ensure the animation restarts if it was previously set to none
            void el.offsetWidth;
            el.style.animation = enterAnim;
          }
        } else {
          // If it hasn't even entered yet, ignore this event
          if (!el.hasAttribute("data-m-played")) return;

          // Scrolled out of view. Reset animation so it can replay next time it intersects.
          // We do NOT set data-m-hidden="true" here so it doesn't pop out visually while scrolling up.
          el.style.animation = "none";
        }
      });
    },
    {
      // Optional: you can adjust threshold or rootMargin here if you want it to trigger earlier/later
      threshold: 0.1, 
    }
  );

  // Initial observation
  document.querySelectorAll("[data-m-scroll]").forEach((el) => observer.observe(el));

  // Handle dynamically added elements (like SPAs, Astro View Transitions, etc.)
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          if (node.hasAttribute("data-m-scroll")) {
            observer.observe(node);
          }
          // Also check children if a whole sub-tree was inserted
          node.querySelectorAll("[data-m-scroll]").forEach((el) => observer.observe(el));
        }
      });
    });
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });
}
