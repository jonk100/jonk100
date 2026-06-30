// design/shared/base.props.ts

import type { Visual }       from "./visuals";
import type { ColorRole }    from "./primitives.tokens";

import type { SpacingProps } from "./spacing.props";
import type { MotionProp }   from "./motion/motion.types";
import type { AriaProps }    from "./aria.props";

/**
 * Base component props shared by all components.
 * 
 * The following props are handled by the `useBaseCompose` hook in `base.hook.ts`:
 * - `class`: mapped to class string via `composeClass` in ./base.hook.ts
 * - `style`: mapped to style string via `composeStyle` in ./base.hook.ts
 * - `disabled`: emits `aria-disabled` + `data-disabled`
 * - `loading`: emits `aria-busy` + `data-loading`
 * - `motion` and `mDistance`: generate motion inline styles and attributes
 * - `action`: emits `data-action`
 * - `target`: emits `data-target`
 * - `v`: emits `data-visual`
 */
export interface BaseComponentProps extends SpacingProps, AriaProps {
  class?:    string;
  style?:    string;
  id?:       string;
  bg?:       ColorRole;
  disabled?: boolean;
  /**
   * `motion` drives enter, exit, and idle animations on any component.
   *
   * Syntax: `{phase}:{name}[/{duration}[/{delay}]][,…][ …]`
   *
   * @example
   * motion="enter:slideUp/200/0"
   * motion="enter:slideUp/200/0 exit:fadeOut/200/0"
   * motion="enter:slideUp/200/0 exit:shakeOut/150/0,slideLeft/200/50"
   * motion="idle:shakeInfinite/800"
   *
   * @see motion.types.ts  — full animation name registry
   * @see motion.css       — keyframes
   */
  motion?:  MotionProp;
  /**
   * `mDistance` sets the travel distance for motion animations like slide, bounce.
   * 
   * - accepts a value (e.g. `100px`, `50vw`) or a multiplier (`x2`, `x3`)
   * of the default prop.
   * 
   * @example
   * <Alert motion="" mDistance="x2" />
   * <Button motion="" mDistance="100px" />
   * <Image motion="" mDistance="x0.5" />
   */
  mDistance?: string;
  /**
   * `action` triggers a declarative action (defined in ./actions)
   *    based on something like a click (e.g., 'replay-motion', 'toggle-theme').
   */
  action?: string;
  /**
   * `target` targets the action to a specific element 
   *    (e.g., '#my-id', 'closest .container').
   * 
   * @example
   * <Button action="copy-code" target="closest .pre-wrapper">Copy</Button>
   */
  target?: string;
  /**
   * `loading` if the component is in a loading state.
   * - emits `data-loading="true"` on the root element via useBaseCompose.
   * - each component implements its own loading UI — typically <Skeleton />.
   * - Badge, Button, Avatar etc. can render a skeleton shape of themselves.
   */
  loading?: boolean;
  testId?:  string;
  v?:       Visual;
  [key: `data-${string}`]: string | number | boolean | undefined;
}