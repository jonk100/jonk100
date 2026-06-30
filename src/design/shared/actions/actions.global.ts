// design/shared/actions/actions.global.ts

function getTargetElement(btn: HTMLElement, targetSelector: string | null): HTMLElement | Document | null {
  if (!targetSelector) return document.body;

  if (targetSelector.startsWith("closest ")) {
    const selector = targetSelector.replace("closest ", "").trim();
    return btn.closest(selector);
  }

  return document.querySelector(targetSelector);
}

export function mountActions(): void {
  if (typeof window === "undefined" || document.body.dataset.actionsInit) return;
  document.body.dataset.actionsInit = "";

  document.addEventListener("click", async (e) => {
    const btn = (e.target as HTMLElement).closest("[data-action]") as HTMLElement;
    if (!btn) return;

    const action = btn.getAttribute("data-action");
    const targetSelector = btn.getAttribute("data-target");
    const targetEl = getTargetElement(btn, targetSelector);

    if (!targetEl) return;

    switch (action) {
      case "replay-motion": {
        const elements = targetEl.querySelectorAll("[data-motion]:not([data-m-scroll])");
        elements.forEach((el) => {
          const htmlEl = el as HTMLElement;

          if (htmlEl.style.display === "none") {
            htmlEl.style.display = "";
          }
          if (htmlEl.style.visibility === "hidden") {
            htmlEl.style.visibility = "";
            htmlEl.style.pointerEvents = "";
            htmlEl.removeAttribute("data-dismissed");
          }

          const enterAnim = htmlEl.getAttribute("data-m-enter");
          if (enterAnim) {
            htmlEl.style.animation = "none";
            void htmlEl.offsetWidth;
            htmlEl.style.animation = enterAnim;
          } else if (htmlEl.style.animation && htmlEl.style.animation !== "none") {
            const currentAnim = htmlEl.style.animation;
            htmlEl.style.animation = "none";
            void htmlEl.offsetWidth;
            htmlEl.style.animation = currentAnim;
          }
        });
        break;
      }

      case "toggle-theme": {
        const isDark = document.documentElement.classList.contains("dark");
        if (isDark) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        } else {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        }
        break;
      }

      case "copy-text": {
        const text = targetEl.textContent?.trim();
        if (text) {
          try {
            await navigator.clipboard.writeText(text);
            const originalText = btn.textContent;
            btn.textContent = "Copied!";
            setTimeout(() => { btn.textContent = originalText; }, 2000);
          } catch (err) {
            console.error("Failed to copy text: ", err);
          }
        }
        break;
      }

      case "copy-code": {
        const pre = btn.closest(".pre-wrapper")?.querySelector("pre") ?? btn.closest("pre");
        const code = pre?.querySelector("code") ?? pre;
        const text = code?.textContent?.trim();
        if (text) {
          try {
            await navigator.clipboard.writeText(text);
            btn.setAttribute("data-copied", "");
            btn.textContent = "Copied!";
            setTimeout(() => {
              btn.removeAttribute("data-copied");
              btn.textContent = "Copy";
            }, 2000);
          } catch (err) {
            console.error("Failed to copy code: ", err);
          }
        }
        break;
      }
    }
  });
}

export function mountCopyButtons(): void {
  if (typeof window === "undefined" || document.body.dataset.copyBtnsInit) return;
  document.body.dataset.copyBtnsInit = "";

  document.querySelectorAll("pre").forEach((pre) => {
    pre.classList.add("pre");
    const wrapper = document.createElement("div");
    wrapper.className = "pre-wrapper";
    pre.parentNode?.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement("button");
    btn.className = "pre-copy-btn";
    btn.setAttribute("data-action", "copy-code");
    btn.setAttribute("aria-label", "Copy code");
    btn.textContent = "Copy";
    wrapper.appendChild(btn);
  });
}
