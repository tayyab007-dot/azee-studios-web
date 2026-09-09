const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../lib/asset-data.ts');
let content = fs.readFileSync(dataFile, 'utf8');

const jsonStart = content.indexOf('[');
const jsonEnd = content.lastIndexOf(']') + 1;
const jsonStr = content.substring(jsonStart, jsonEnd);

// Parse JSON. It's an array of objects.
let assets;
try {
  assets = JSON.parse(jsonStr);
} catch (e) {
  // If strict JSON parsing fails, try eval
  assets = eval(jsonStr);
}

let modified = false;
assets = assets.map(asset => {
  if (asset.category === 'motion-graphics' && asset.type === 'image') {
    asset.category = 'posts';
    modified = true;
  }
  if (asset.category === 'posts' && asset.type === 'video') {
    asset.category = 'motion-graphics';
    modified = true;
  }
  return asset;
});

if (modified) {
  const newContent = content.substring(0, jsonStart) + JSON.stringify(assets, null, 2) + content.substring(jsonEnd);
  fs.writeFileSync(dataFile, newContent, 'utf8');
  console.log('Asset data fixed successfully!');
} else {
  console.log('No assets needed fixing.');
}
