// design/shared/motion/motion.dismiss.ts
//
// Event-delegated dismiss handler for any element with [data-m-exit] that
// contains a [data-dismiss] button. Plays the exit animation then hides.
//
// Usage in any dismissible component's <script> block:
//
//   <script>
//     import { mountMotionDismiss } from "~/shared/motion/motion.dismiss";
//     mountMotionDismiss();
//   </script>
//
// The guard on document.body ensures calling this multiple times per page
// (e.g. multiple Alert instances) installs exactly one delegated listener.

export function mountMotionDismiss(): void {
  if (document.body.dataset.mDismissInit) return;
  document.body.dataset.mDismissInit = "";

  document.addEventListener("click", (e) => {
    const btn = (e.target as Element).closest<HTMLElement>("[data-dismiss]");
    if (!btn) return;

    const el = btn.closest<HTMLElement>("[data-m-exit]");
    if (!el) return;

    e.stopPropagation();

    const exitAnim = el.getAttribute("data-m-exit")!;
    const exitDur  = Number(el.getAttribute("data-m-exit-dur")) || 300;

    el.style.animation = exitAnim;

    setTimeout(() => {
      // User requested maintaining size in DOM. 
      // This leaves an empty space rather than collapsing.
      el.style.visibility    = "hidden";
      el.style.pointerEvents = "none";
      el.style.animation     = "";
      el.setAttribute("data-dismissed", "true");
    }, exitDur);
  });
}
