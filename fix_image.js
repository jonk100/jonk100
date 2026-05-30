const fs = require('fs');
const file = 'src/components/ui/primitives/Image.astro';
let content = fs.readFileSync(file, 'utf8');

// Destructure style from Astro.props
content = content.replace('  "class:list": classList = {},', '  "class:list": classList = {},\n  style = "",');

// Add mergedStyle logic
content = content.replace('const isZoomable = zoomable ?? (fit === \'cover\');', 'const isZoomable = zoomable ?? (fit === \'cover\');\nconst mergedStyle = [\n  `object-position: ${position}`,\n  `object-fit: ${fit}`,\n  style\n].filter(Boolean).join(\';\');');

// Replace inline styles
content = content.replace(/style={`object-position: \${position}; object-fit: \${fit};`}/g, 'style={mergedStyle}');

fs.writeFileSync(file, content);
