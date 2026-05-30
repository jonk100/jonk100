const fs = require('fs');
const file = 'src/components/ui/feedback/Badge.astro';
let content = fs.readFileSync(file, 'utf8');

// 1. Add explicit flags
const extractProps = `const {
  theme = 'secondary',
  size = 'sm',
  outlined = false,
  frame = 'none',
  effects = [],
  class: className = '',
  "class:list": classList = {},
  ...rest
} = Astro.props;

const isExplicitTheme = Astro.props.theme !== undefined;
const isExplicitSize = Astro.props.size !== undefined;
const isExplicitOutlined = Astro.props.outlined !== undefined;`;

content = content.replace(/const \{\n  theme = 'secondary',\n  size = 'sm',\n  outlined = false,\n  frame = 'none',\n  effects = \[\],\n  class: className = '',\n  "class:list": classList = \{\},\n  \.\.\.rest\n\} = Astro\.props;/, extractProps);

// 2. Add classes
const classList = `  class:list={[
    'badge',
    \`badge--\${theme}\`,
    \`badge--\${size}\`,
    { 'badge--outlined': outlined },
    { 'badge--explicit-theme': isExplicitTheme },
    { 'badge--explicit-size': isExplicitSize },
    { 'badge--explicit-outlined': isExplicitOutlined },`;

content = content.replace(/  class:list=\{\[\n    'badge',\n    \`badge--\$\{theme\}\`,\n    \`badge--\$\{size\}\`,\n    \{ 'badge--outlined': outlined \},/, classList);

// 3. Update outlined CSS
content = content.replace(/\.badge--outlined \{/, `.badge--outlined,
  :global(.badge-group[data-group-outlined="true"]) .badge:not(.badge--explicit-outlined) {`);

// 4. Update sizes CSS
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
sizes.forEach(s => {
  content = content.replace(
    new RegExp(`\\.badge--${s} \\{`), 
    `.badge--${s},
  :global(.badge-group[data-group-size="${s}"]) .badge:not(.badge--explicit-size) {`
  );
});

// 5. Update themes CSS
const themes = ['primary', 'secondary', 'accent', 'danger', 'success', 'ghost', 'default'];
themes.forEach(t => {
  content = content.replace(
    new RegExp(`\\.badge--${t} \\{`), 
    `.badge--${t},
  :global(.badge-group[data-group-theme="${t}"]) .badge:not(.badge--explicit-theme) {`
  );
});

fs.writeFileSync(file, content);
