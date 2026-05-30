const fs = require('fs');
const path = require('path');

const srcDir = '/home/jk/Code/portfolio/src';

const moves = [
  { from: 'components/Button.astro', to: 'components/ui/controls/Button.astro' },
  { from: 'components/Container.astro', to: 'components/ui/layout/Container.astro' },
  { from: 'components/Divider.astro', to: 'components/ui/layout/Divider.astro' },
  { from: 'components/SectionLabel.astro', to: 'components/ui/typography/SectionLabel.astro' },
  { from: 'components/ui/primitives/Text.astro', to: 'components/ui/typography/Text.astro' },
  { from: 'components/ui/primitives/Code.astro', to: 'components/ui/typography/Code.astro' },
  { from: 'components/ui/primitives/List.astro', to: 'components/ui/typography/List.astro' },
  { from: 'components/ui/layout/Card.astro', to: 'components/ui/card/Card.astro' },
  { from: 'components/ui/layout/CardHeader.astro', to: 'components/ui/card/CardHeader.astro' },
  { from: 'components/ui/layout/CardContent.astro', to: 'components/ui/card/CardContent.astro' },
  { from: 'components/ui/layout/CardFooter.astro', to: 'components/ui/card/CardFooter.astro' },
  { from: 'components/ui/overlay/Modal.astro', to: 'components/ui/modal/Modal.astro' },
  { from: 'components/ui/overlay/AlertDialog.astro', to: 'components/ui/alert-dialog/AlertDialog.astro' },
];

// Ensure directories exist
const newDirs = new Set(moves.map(m => path.dirname(path.join(srcDir, m.to))));
for (const dir of newDirs) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Perform file moves
for (const move of moves) {
  const fromPath = path.join(srcDir, move.from);
  const toPath = path.join(srcDir, move.to);
  if (fs.existsSync(fromPath)) {
    fs.renameSync(fromPath, toPath);
    console.log(`Moved ${move.from} -> ${move.to}`);
  }
}

// Remove SrOnly.astro
const srOnlyPath = path.join(srcDir, 'components/SrOnly.astro');
if (fs.existsSync(srOnlyPath)) {
  fs.unlinkSync(srOnlyPath);
  console.log('Deleted SrOnly.astro');
}

// Recursively get all files
function getAllFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, filesList);
    } else {
      if (filePath.endsWith('.astro') || filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.js') || filePath.endsWith('.mdx')) {
        filesList.push(filePath);
      }
    }
  }
  return filesList;
}

const allFiles = getAllFiles(srcDir);

// Map old component paths to new component paths relative to srcDir
const componentPaths = moves.map(m => ({
  name: path.basename(m.from, '.astro'),
  oldSrcPath: m.from, // e.g., 'components/Button.astro'
  newSrcPath: m.to
}));

// We also replaced SrOnly with VisuallyHidden
componentPaths.push({
  name: 'SrOnly',
  oldSrcPath: 'components/SrOnly.astro',
  newSrcPath: 'components/ui/layout/VisuallyHidden.astro',
  replaceName: 'VisuallyHidden'
});

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  for (const comp of componentPaths) {
    // Regex to match imports for this component
    // Example: import Button from '../components/Button.astro';
    const regex = new RegExp(`import\\s+([A-Za-z0-9_]+)\\s+from\\s+['"]([^'"]*?/?${path.basename(comp.oldSrcPath)})['"]`, 'g');
    
    content = content.replace(regex, (match, importName, importPath) => {
      // Calculate new relative path
      const fileDir = path.dirname(file);
      const targetAbsPath = path.join(srcDir, comp.newSrcPath);
      let newRelPath = path.relative(fileDir, targetAbsPath);
      if (!newRelPath.startsWith('.')) newRelPath = './' + newRelPath;
      
      changed = true;
      let newImportName = importName;
      if (comp.replaceName) {
        newImportName = comp.replaceName;
        // Also need to replace all `<SrOnly>` with `<VisuallyHidden>`
        content = content.replace(/<SrOnly/g, '<VisuallyHidden').replace(/<\/SrOnly>/g, '</VisuallyHidden>');
      }
      return `import ${newImportName} from '${newRelPath}'`;
    });
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated imports in ${path.relative(srcDir, file)}`);
  }
}
console.log('Done refactoring imports.');
