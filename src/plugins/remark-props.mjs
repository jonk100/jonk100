export default function remarkProps() {
  return (tree) => {
    const newChildren = [];
    let currentWrapper = null;

    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      
      // Check for custom prop block
      if (node.type === 'paragraph' && node.children.length === 1 && node.children[0].type === 'text') {
        const text = node.children[0].value.trim();
        
        if (text.startsWith('[') && text.endsWith(']') && text !== '[/]') {
          const propString = text.slice(1, -1).trim();
          const props = {};
          
          // Parse props (e.g., tone=primary size=sm)
          const tokens = propString.split(/[\s\n]+/);
          tokens.forEach(token => {
            const [key, val] = token.split('=');
            if (key && val) {
              props[key] = val;
            } else if (key) {
               props[key] = "true";
            }
          });

          // Create an MDX JSX element (maps to Box component)
          currentWrapper = {
            type: 'mdxJsxFlowElement',
            name: 'Box',
            attributes: Object.entries(props).map(([key, value]) => ({
              type: 'mdxJsxAttribute',
              name: key,
              value: value
            })),
            children: []
          };
          
          newChildren.push(currentWrapper);
          continue;
        }
        
        // Check for closing tag
        if (text === '[/]' && currentWrapper) {
          currentWrapper = null;
          continue;
        }
      }
      
      if (currentWrapper) {
        currentWrapper.children.push(node);
      } else {
        newChildren.push(node);
      }
    }
    
    tree.children = newChildren;
  };
}
