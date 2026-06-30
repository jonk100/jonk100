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
 * - SVG files are stored in /src/design/shared/icons as the source of truth
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
 * - Add new icons only by adding SVG files to /src/design/shared/icons
 * - Run the generator script to update this registry
 */

import type { SvgComponent } from 'astro/types';

import IconAlertCircle from './alert-circle.svg';
import IconAlertDialog from './alert-dialog.svg';
import IconAlertTriangle from './alert-triangle.svg';
import IconAlert from './alert.svg';
import IconArrowDownLeft from './arrow-down-left.svg';
import IconArrowDownRight from './arrow-down-right.svg';
import IconArrowDown from './arrow-down.svg';
import IconArrowLeft from './arrow-left.svg';
import IconArrowRight from './arrow-right.svg';
import IconArrowUpLeft from './arrow-up-left.svg';
import IconArrowUpRight from './arrow-up-right.svg';
import IconArrowUp from './arrow-up.svg';
import IconAstro from './astro.svg';
import IconAvatar from './avatar.svg';
import IconBadgeGroup from './badge-group.svg';
import IconBadge from './badge.svg';
import IconBentoCell from './bento-cell.svg';
import IconBentoGrid from './bento-grid.svg';
import IconBold from './bold.svg';
import IconBox from './box.svg';
import IconBreadcrumbs from './breadcrumbs.svg';
import IconButtonGroup from './button-group.svg';
import IconButton from './button.svg';
import IconCallout from './callout.svg';
import IconCardContent from './card-content.svg';
import IconCardFooter from './card-footer.svg';
import IconCardHeader from './card-header.svg';
import IconCard from './card.svg';
import IconCenter from './center.svg';
import IconCheckCircle from './check-circle.svg';
import IconCheck from './check.svg';
import IconCheckbox from './checkbox.svg';
import IconChevronDown from './chevron-down.svg';
import IconChevronLeft from './chevron-left.svg';
import IconChevronRight from './chevron-right.svg';
import IconChevronUp from './chevron-up.svg';
import IconCode from './code.svg';
import IconColumns from './columns.svg';
import IconCombobox from './combobox.svg';
import IconContainer from './container.svg';
import IconDatePicker from './date-picker.svg';
import IconDebug from './debug.svg';
import IconDescriptionList from './description-list.svg';
import IconDivider from './divider.svg';
import IconEvent from './event.svg';
import IconFeedback from './feedback.svg';
import IconField from './field.svg';
import IconFileMagnifyer from './file-magnifyer.svg';
import IconFilePreview from './file-preview.svg';
import IconFlex from './flex.svg';
import IconFooter from './footer.svg';
import IconFrame from './frame.svg';
import IconGift from './gift.svg';
import IconGrid from './grid.svg';
import IconHeader from './header.svg';
import IconHeading from './heading.svg';
import IconHelperText from './helper-text.svg';
import IconHome from './home.svg';
import IconIcon from './icon.svg';
import IconImage from './image.svg';
import IconInfo from './info.svg';
import IconInline from './inline.svg';
import IconInputGroup from './input-group.svg';
import IconInput from './input.svg';
import IconItalic from './italic.svg';
import IconJavascript from './javascript.svg';
import IconJogBack from './jog-back.svg';
import IconJogForward from './jog-forward.svg';
import IconKeyValueList from './key-value-list.svg';
import IconKeyboard from './keyboard.svg';
import IconLabel from './label.svg';
import IconLink from './link.svg';
import IconList from './list.svg';
import IconMenu from './menu.svg';
import IconModal from './modal.svg';
import IconNavbar from './navbar.svg';
import IconNext from './next.svg';
import IconNodeJs from './node-js.svg';
import IconPagination from './pagination.svg';
import IconPanel2 from './panel-2.svg';
import IconPanel3 from './panel-3.svg';
import IconPanel from './panel.svg';
import IconPaper from './paper.svg';
import IconPause from './pause.svg';
import IconPlay from './play.svg';
import IconPlayer from './player.svg';
import IconPlayground from './playground.svg';
import IconPopover from './popover.svg';
import IconPrevious from './previous.svg';
import IconQuote from './quote.svg';
import IconRadioGroup from './radio-group.svg';
import IconRadio from './radio.svg';
import IconRefreshCw from './refresh-cw.svg';
import IconRefresh from './refresh.svg';
import IconSearch from './search.svg';
import IconSectionLabel from './section-label.svg';
import IconSection from './section.svg';
import IconSelect from './select.svg';
import IconSheet from './sheet.svg';
import IconSkeleton from './skeleton.svg';
import IconSpacer from './spacer.svg';
import IconSparkline from './sparkline.svg';
import IconSpinnerThree from './spinner-three.svg';
import IconSpinnerTwo from './spinner-two.svg';
import IconSpinner from './spinner.svg';
import IconStack from './stack.svg';
import IconStar from './star.svg';
import IconStepper from './stepper.svg';
import IconStop from './stop.svg';
import IconStrikethrough from './strikethrough.svg';
import IconSwitchOff from './switch-off.svg';
import IconSwitchOn from './switch-on.svg';
import IconTableCell from './table-cell.svg';
import IconTableHead from './table-head.svg';
import IconTableRow from './table-row.svg';
import IconTable from './table.svg';
import IconTabs from './tabs.svg';
import IconTailwind from './tailwind.svg';
import IconTechStackList from './tech-stack-list.svg';
import IconText from './text.svg';
import IconTile from './tile.svg';
import IconTimeline from './timeline.svg';
import IconToast from './toast.svg';
import IconTooltip from './tooltip.svg';
import IconTreeView from './tree-view.svg';
import IconTypescript from './typescript.svg';
import IconUnderline from './underline.svg';
import IconWell from './well.svg';
import IconX from './x.svg';
import IconZap from './zap.svg';

export const icons = {
  'alert-circle': IconAlertCircle,
  'alert-dialog': IconAlertDialog,
  'alert-triangle': IconAlertTriangle,
  'alert': IconAlert,
  'arrow-down-left': IconArrowDownLeft,
  'arrow-down-right': IconArrowDownRight,
  'arrow-down': IconArrowDown,
  'arrow-left': IconArrowLeft,
  'arrow-right': IconArrowRight,
  'arrow-up-left': IconArrowUpLeft,
  'arrow-up-right': IconArrowUpRight,
  'arrow-up': IconArrowUp,
  'astro': IconAstro,
  'avatar': IconAvatar,
  'badge-group': IconBadgeGroup,
  'badge': IconBadge,
  'bento-cell': IconBentoCell,
  'bento-grid': IconBentoGrid,
  'bold': IconBold,
  'box': IconBox,
  'breadcrumbs': IconBreadcrumbs,
  'button-group': IconButtonGroup,
  'button': IconButton,
  'callout': IconCallout,
  'card-content': IconCardContent,
  'card-footer': IconCardFooter,
  'card-header': IconCardHeader,
  'card': IconCard,
  'center': IconCenter,
  'check-circle': IconCheckCircle,
  'check': IconCheck,
  'checkbox': IconCheckbox,
  'chevron-down': IconChevronDown,
  'chevron-left': IconChevronLeft,
  'chevron-right': IconChevronRight,
  'chevron-up': IconChevronUp,
  'code': IconCode,
  'columns': IconColumns,
  'combobox': IconCombobox,
  'container': IconContainer,
  'date-picker': IconDatePicker,
  'debug': IconDebug,
  'description-list': IconDescriptionList,
  'divider': IconDivider,
  'event': IconEvent,
  'feedback': IconFeedback,
  'field': IconField,
  'file-magnifyer': IconFileMagnifyer,
  'file-preview': IconFilePreview,
  'flex': IconFlex,
  'footer': IconFooter,
  'frame': IconFrame,
  'gift': IconGift,
  'grid': IconGrid,
  'header': IconHeader,
  'heading': IconHeading,
  'helper-text': IconHelperText,
  'home': IconHome,
  'icon': IconIcon,
  'image': IconImage,
  'info': IconInfo,
  'inline': IconInline,
  'input-group': IconInputGroup,
  'input': IconInput,
  'italic': IconItalic,
  'javascript': IconJavascript,
  'jog-back': IconJogBack,
  'jog-forward': IconJogForward,
  'key-value-list': IconKeyValueList,
  'keyboard': IconKeyboard,
  'label': IconLabel,
  'link': IconLink,
  'list': IconList,
  'menu': IconMenu,
  'modal': IconModal,
  'navbar': IconNavbar,
  'next': IconNext,
  'node-js': IconNodeJs,
  'pagination': IconPagination,
  'panel-2': IconPanel2,
  'panel-3': IconPanel3,
  'panel': IconPanel,
  'paper': IconPaper,
  'pause': IconPause,
  'play': IconPlay,
  'player': IconPlayer,
  'playground': IconPlayground,
  'popover': IconPopover,
  'previous': IconPrevious,
  'quote': IconQuote,
  'radio-group': IconRadioGroup,
  'radio': IconRadio,
  'refresh-cw': IconRefreshCw,
  'refresh': IconRefresh,
  'search': IconSearch,
  'section-label': IconSectionLabel,
  'section': IconSection,
  'select': IconSelect,
  'sheet': IconSheet,
  'skeleton': IconSkeleton,
  'spacer': IconSpacer,
  'sparkline': IconSparkline,
  'spinner-three': IconSpinnerThree,
  'spinner-two': IconSpinnerTwo,
  'spinner': IconSpinner,
  'stack': IconStack,
  'star': IconStar,
  'stepper': IconStepper,
  'stop': IconStop,
  'strikethrough': IconStrikethrough,
  'switch-off': IconSwitchOff,
  'switch-on': IconSwitchOn,
  'table-cell': IconTableCell,
  'table-head': IconTableHead,
  'table-row': IconTableRow,
  'table': IconTable,
  'tabs': IconTabs,
  'tailwind': IconTailwind,
  'tech-stack-list': IconTechStackList,
  'text': IconText,
  'tile': IconTile,
  'timeline': IconTimeline,
  'toast': IconToast,
  'tooltip': IconTooltip,
  'tree-view': IconTreeView,
  'typescript': IconTypescript,
  'underline': IconUnderline,
  'well': IconWell,
  'x': IconX,
  'zap': IconZap
} satisfies Record<string, SvgComponent>;

export type SvgName = keyof typeof icons;
