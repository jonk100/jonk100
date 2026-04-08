/**
 * formController.ts
 * 
 * Handles common form behavior:
 * - toggle open/close
 * - reset button
 * - submit flow
 * - status messages
 */

export interface FormControllerOptions {
  form: HTMLFormElement;
  statusEl: HTMLElement;
  outputEl?: HTMLTextAreaElement;
  details?: HTMLDetailsElement;
  toggleBtn?: HTMLButtonElement;
  resetBtn?: HTMLButtonElement;

  /**
   * Called when form submits
   */
  onSubmit: (data: FormData) => Promise<{
    ok: boolean;
    message?: string;
    output?: string;
  }>;
}

export function initFormController(opts: FormControllerOptions): void {
  const {
    form,
    statusEl,
    outputEl,
    details,
    toggleBtn,
    resetBtn,
    onSubmit,
  } = opts;

  const setStatus = (msg: string) => {
    statusEl.textContent = msg;
  };

  // Toggle behavior
  if (toggleBtn && details) {
    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      details.open = !details.open;
      toggleBtn.setAttribute("aria-expanded", String(details.open));
    });

    details.addEventListener("toggle", () => {
      toggleBtn.setAttribute("aria-expanded", String(details.open));
    });
  }

  // Reset behavior
  if (resetBtn) {
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      form.reset();
      setStatus("Form reset.");

      setTimeout(() => {
        if (outputEl) outputEl.value = "";
        setStatus("");
      }, 1500);
    });
  }

  // Submit behavior
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (outputEl) outputEl.value = "";
    setStatus("Working...");

    try {
      const result = await onSubmit(new FormData(form));

      if (!result.ok) {
        setStatus(result.message ?? "Request failed");
        return;
      }

      if (outputEl && result.output) {
        outputEl.value = result.output;
      }

      setStatus(result.message ?? "Done");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : String(err));
    }
  });
}