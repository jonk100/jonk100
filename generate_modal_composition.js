const fs = require('fs');
const path = require('path');

const srcDir = '/home/jk/Code/portfolio/src/components/ui/modal';

// Ensure directory exists
if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });

const modalContent = `---
import type { FrameVariant, WrapperSize } from '/src/types/variants.types';

export interface Props {
  id: string;
  size?: WrapperSize;
  frame?: FrameVariant;
  class?: string;
  "class:list"?: Record<string, boolean> | any[];
  [key: string]: any;
}

const {
  id,
  size = 'md',
  frame = 'none',
  class: className = '',
  "class:list": classList = {},
  ...rest
} = Astro.props;
---

<dialog
  id={id}
  closedby="any"
  class:list={['modal', \`modal--space-\${size}\`, frame !== 'none' ? \`frame-variant--\${frame}\` : '', className, classList]}
  {...rest}
>
  <div class="modal-content">
    <slot />
  </div>
</dialog>

<script>
  const initializeModals = () => {
    const dialogs = document.querySelectorAll<HTMLDialogElement>('dialog[closedby="any"]');
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialogs.forEach(dialog => {
        dialog.addEventListener('click', (e: Event) => {
          const event = e as MouseEvent;
          if (event.target !== dialog) return;
          const rect = dialog.getBoundingClientRect();
          const isDialogContent = (
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width
          );
          if (!isDialogContent) dialog.close();
        });
      });
    }
  };
  
  initializeModals();
  document.addEventListener('astro:page-load', initializeModals);
</script>

<style>
  .modal {
    padding: 0;
    border: none;
    border-radius: var(--rad-lg);
    background: var(--bg-surface);
    color: var(--text);
    box-shadow: var(--shadow-xl);
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    margin: auto;
    inset: 0;
    
    transition: opacity 0.3s ease-out, transform 0.3s ease-out, display 0.3s allow-discrete, overlay 0.3s allow-discrete;
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  
  .modal[open] {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  @starting-style {
    .modal[open] {
      opacity: 0;
      transform: translateY(10px) scale(0.98);
    }
  }

  .modal::backdrop {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    transition: background-color 0.3s ease-out, backdrop-filter 0.3s ease-out, display 0.3s allow-discrete, overlay 0.3s allow-discrete;
  }
  
  @starting-style {
    .modal[open]::backdrop {
      background: rgba(0, 0, 0, 0);
      backdrop-filter: blur(0px);
    }
  }

  .modal--space-sm { max-width: 400px; }
  .modal--space-md { max-width: 600px; }
  .modal--space-lg { max-width: 800px; }
  .modal--space-full { max-width: 95vw; height: 95vh; }

  .modal-content {
    display: flex;
    flex-direction: column;
    max-height: inherit;
  }
</style>
`;

const modalHeaderContent = `---
export interface Props {
  class?: string;
  "class:list"?: Record<string, boolean> | any[];
  [key: string]: any;
}
const { class: className = '', "class:list": classList = {}, ...rest } = Astro.props;
---
<header class:list={["modal-header", className, classList]} {...rest}>
  <slot />
</header>
<style>
  .modal-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-6);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
</style>
`;

const modalHeadingContent = `---
import Text from '../typography/Text.astro';
export interface Props {
  class?: string;
  [key: string]: any;
}
const { class: className = '', ...rest } = Astro.props;
---
<Text as="h2" type="heading-3" class:list={["modal-heading", className]} {...rest}>
  <slot />
</Text>
`;

const modalSubheadingContent = `---
import Text from '../typography/Text.astro';
export interface Props {
  class?: string;
  [key: string]: any;
}
const { class: className = '', ...rest } = Astro.props;
---
<Text as="p" tone="muted" class:list={["modal-subheading", className]} {...rest}>
  <slot />
</Text>
`;

const modalEyebrowContent = `---
import Text from '../typography/Text.astro';
export interface Props {
  class?: string;
  [key: string]: any;
}
const { class: className = '', ...rest } = Astro.props;
---
<Text as="span" type="label" tone="accent" class:list={["modal-eyebrow", className]} {...rest}>
  <slot />
</Text>
`;

const modalBodyContent = `---
export interface Props {
  class?: string;
  "class:list"?: Record<string, boolean> | any[];
  [key: string]: any;
}
const { class: className = '', "class:list": classList = {}, ...rest } = Astro.props;
---
<div class:list={["modal-body", className, classList]} {...rest}>
  <slot />
</div>
<style>
  .modal-body {
    padding: var(--space-6);
    overflow-y: auto;
  }
</style>
`;

fs.writeFileSync(path.join(srcDir, 'Modal.astro'), modalContent);
fs.writeFileSync(path.join(srcDir, 'ModalHeader.astro'), modalHeaderContent);
fs.writeFileSync(path.join(srcDir, 'ModalHeading.astro'), modalHeadingContent);
fs.writeFileSync(path.join(srcDir, 'ModalSubheading.astro'), modalSubheadingContent);
fs.writeFileSync(path.join(srcDir, 'ModalEyebrow.astro'), modalEyebrowContent);
fs.writeFileSync(path.join(srcDir, 'ModalBody.astro'), modalBodyContent);
console.log('Generated Modal compositional components.');
