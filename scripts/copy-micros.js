const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const root = path.resolve(__dirname, '..');

copyDir(
  path.join(root, 'micro-cardapio', 'dist'),
  path.join(root, 'container', 'dist', 'cardapio')
);
console.log('Copied micro-cardapio/dist → container/dist/cardapio');

copyDir(
  path.join(root, 'micro-pedido', 'dist'),
  path.join(root, 'container', 'dist', 'pedido')
);
console.log('Copied micro-pedido/dist → container/dist/pedido');
