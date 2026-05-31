/**
 * src/design/icons/index.ts
 * AUTO-GENERATED FILE
 * DO NOT EDIT MANUALLY
 *
 * Design System Icon Registry
 *
 * This file defines the public icon contract for the design system.
 *
 * Architecture:
 * - SVG files are stored in /src/design/icons as the source of truth
 * Each SVG is transformed into an importable Astro SVG component
 * - Internal component names are prefixed with "Icon" to avoid collision
 *   with UI components (e.g. CardHeader, TableRow)
 * - Public API uses kebab-case string identifiers
 *
 * Layers:
 * - UI Components:       CardHeader, TableRow, ButtonGroup
 * - Icon Components:     IconCardHeader, IconTableRow, IconButtonGroup
 * - Public Icon API:     'card-header', 'table-row', 'button-group'
 *
 * Usage:
 * <Svg name="card-header" />
 *
 * Type Safety:
 * - SvgName is derived from the registry keys
 * - Invalid icon names fail at compile time
 * Rules:
 * - Do not manually edit this file
 * - Treat this file as read-only output of the icon generation process
 * - Add new icons only by adding SVG files to /src/design/icons
 * - Run the generator script to update this registry
 */

import type { SvgComponent } from 'astro/types';

import IconAlertDialog from './alert-dialog.svg';
import IconAlert from './alert.svg';
import IconAvatar from './avatar.svg';
import IconBadgeGroup from './badge-group.svg';
import IconBadge from './badge.svg';
import IconBentoCell from './bento-cell.svg';
import IconBentoGrid from './bento-grid.svg';
import IconBox from './box.svg';
import IconButtonGroup from './button-group.svg';
import IconButton from './button.svg';
import IconCardContent from './card-content.svg';
import IconCardFooter from './card-footer.svg';
import IconCardHeader from './card-header.svg';
import IconCard from './card.svg';
import IconCenter from './center.svg';
import IconCheckbox from './checkbox.svg';
import IconCode from './code.svg';
import IconColumns from './columns.svg';
import IconCombobox from './combobox.svg';
import IconContainer from './container.svg';
import IconDivider from './divider.svg';
import IconFrame from './frame.svg';
import IconGrid from './grid.svg';
import IconIcon from './icon.svg';
import IconImage from './image.svg';
import IconInline from './inline.svg';
import IconInputGroup from './input-group.svg';
import IconInput from './input.svg';
import IconLink from './link.svg';
import IconList from './list.svg';
import IconModal from './modal.svg';
import IconPaper from './paper.svg';
import IconPopover from './popover.svg';
import IconRadioGroup from './radio-group.svg';
import IconRadio from './radio.svg';
import IconSearch from './search.svg';
import IconSectionLabel from './section-label.svg';
import IconSelect from './select.svg';
import IconSheet from './sheet.svg';
import IconSkeleton from './skeleton.svg';
import IconSpacer from './spacer.svg';
import IconSpinner from './spinner.svg';
import IconStack from './stack.svg';
import IconSwitch from './switch.svg';
import IconTableCell from './table-cell.svg';
import IconTableHead from './table-head.svg';
import IconTableRow from './table-row.svg';
import IconTable from './table.svg';
import IconText from './text.svg';
import IconTooltip from './tooltip.svg';

export const icons = {
  'alert-dialog': IconAlertDialog,
  'alert': IconAlert,
  'avatar': IconAvatar,
  'badge-group': IconBadgeGroup,
  'badge': IconBadge,
  'bento-cell': IconBentoCell,
  'bento-grid': IconBentoGrid,
  'box': IconBox,
  'button-group': IconButtonGroup,
  'button': IconButton,
  'card-content': IconCardContent,
  'card-footer': IconCardFooter,
  'card-header': IconCardHeader,
  'card': IconCard,
  'center': IconCenter,
  'checkbox': IconCheckbox,
  'code': IconCode,
  'columns': IconColumns,
  'combobox': IconCombobox,
  'container': IconContainer,
  'divider': IconDivider,
  'frame': IconFrame,
  'grid': IconGrid,
  'icon': IconIcon,
  'image': IconImage,
  'inline': IconInline,
  'input-group': IconInputGroup,
  'input': IconInput,
  'link': IconLink,
  'list': IconList,
  'modal': IconModal,
  'paper': IconPaper,
  'popover': IconPopover,
  'radio-group': IconRadioGroup,
  'radio': IconRadio,
  'search': IconSearch,
  'section-label': IconSectionLabel,
  'select': IconSelect,
  'sheet': IconSheet,
  'skeleton': IconSkeleton,
  'spacer': IconSpacer,
  'spinner': IconSpinner,
  'stack': IconStack,
  'switch': IconSwitch,
  'table-cell': IconTableCell,
  'table-head': IconTableHead,
  'table-row': IconTableRow,
  'table': IconTable,
  'text': IconText,
  'tooltip': IconTooltip
} satisfies Record<string, SvgComponent>;

export type SvgName = keyof typeof icons;
