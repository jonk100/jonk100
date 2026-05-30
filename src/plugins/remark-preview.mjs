/**
 * A custom build-time Remark plugin that extracts the raw source code of elements
 * nested inside <ComponentPreview> and automatically prepends relevant file imports.
 * - Written with a zero-dependency recursive AST traversal to remain bulletproof.
 */
export default function remarkPreview() {
  // Simple, zero-dependency recursive AST visitor
  const visit = (node, type, callback) => {
    if (node.type === type) {
      callback(node);
    }
    if (node.children) {
      node.children.forEach(child => visit(child, type, callback));
    }
  };

  return (tree, file) => {
    const rawContent = file.value;
    if (!rawContent) return;

    // 1. Extract all import statements at the top of the MDX file
    const importRegex = /import\s+[\s\S]*?\s+from\s+['"].*?['"];?/g;
    const allImports = rawContent.match(importRegex) || [];

    // Helper to find relevant imports used inside the preview child code
    const getRelevantImports = (childCode) => {
      return allImports.filter(imp => {
        // Extract default or named imported names
        // e.g. "import Link from '...'" -> matches default "Link"
        // e.g. "import { Stack, Inline } from '...'" -> matches "Stack", "Inline"
        const defaultMatch = imp.match(/import\s+(\w+)\s+from/);
        if (defaultMatch) {
          const defaultImport = defaultMatch[1];
          if (defaultImport && defaultImport !== 'ComponentPreview') {
            const regex = new RegExp(`\\b${defaultImport}\\b`);
            return regex.test(childCode);
          }
        }

        // Check for named imports (curly braces)
        const namedMatch = imp.match(/import\s*\{([\s\S]*?)\}\s*from/);
        if (namedMatch) {
          const namedImports = namedMatch[1].split(',').map(n => n.trim().split(/\s+as\s+/)[0]);
          return namedImports.some(name => {
            const regex = new RegExp(`\\b${name}\\b`);
            return regex.test(childCode);
          });
        }

        return false;
      });
    };

    // 2. Traverse the MDX AST to find <ComponentPreview> components
    visit(tree, 'mdxJsxFlowElement', (node) => {
      if (node.name !== 'ComponentPreview') return;

      // Ensure the node has positional boundaries in the raw file
      if (!node.position || !node.position.start || !node.position.end) return;

      const startOffset = node.position.start.offset;
      const endOffset = node.position.end.offset;

      if (startOffset === undefined || endOffset === undefined) return;

      // Extract the raw text slice containing the full <ComponentPreview> tag
      const rawSlice = rawContent.slice(startOffset, endOffset);

      // Find the closing bracket of the opening tag <ComponentPreview ...>
      const openTagEndIndex = rawSlice.indexOf('>');
      if (openTagEndIndex === -1) return;

      // Find the start of the closing tag </ComponentPreview>
      const closeTagStartIndex = rawSlice.lastIndexOf('</ComponentPreview>');
      if (closeTagStartIndex === -1 || closeTagStartIndex <= openTagEndIndex) return;

      // Extract the raw children source code inside the tag
      const rawChildrenCode = rawSlice.slice(openTagEndIndex + 1, closeTagStartIndex);

      // Clean up common indents (dedent)
      const lines = rawChildrenCode.split('\n');
      
      // Filter out empty trailing/leading lines
      while (lines.length > 0 && lines[0].trim() === '') lines.shift();
      while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();

      // Find minimum indentation across non-empty lines to trim margins
      const minIndent = lines.reduce((min, line) => {
        if (line.trim() === '') return min;
        const match = line.match(/^(\s*)/);
        const indent = match ? match[1].length : 0;
        return indent < min ? indent : min;
      }, Infinity);

      const dedentedLines = lines.map(line => {
        if (line.trim() === '') return '';
        return line.slice(minIndent === Infinity ? 0 : minIndent);
      });

      const childCode = dedentedLines.join('\n');

      // Prepend relevant imports that are used inside this preview code
      const relevantImports = getRelevantImports(childCode);
      const finalCodeBlock = relevantImports.length > 0
        ? `---\n${relevantImports.join('\n')}\n---\n\n${childCode}`
        : childCode;

      // Inject the generated code string directly into the node's 'code' attribute
      const existingCodeAttr = node.attributes.find(attr => attr.name === 'code');
      if (existingCodeAttr) {
        existingCodeAttr.value = finalCodeBlock;
      } else {
        node.attributes.push({
          type: 'mdxJsxAttribute',
          name: 'code',
          value: finalCodeBlock
        });
      }
    });
  };
}
