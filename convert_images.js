const sharp = require('sharp');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

async function main() {
    console.log("Starting image conversion...");
    const files = glob.sync('public/**/*.{png,jpg,jpeg,avif}', { ignore: 'public/**/*.webp' });
    
    let converted = 0;
    let failed = 0;

    for (const file of files) {
        try {
            const parsed = path.parse(file);
            const outputPath = path.join(parsed.dir, `${parsed.name}.webp`);
            
            await sharp(file)
                .webp({ quality: 80 })
                .toFile(outputPath);
            
            // Delete original file
            fs.unlinkSync(file);
            converted++;
            console.log(`Converted: ${file} -> ${outputPath}`);
        } catch (err) {
            console.error(`Failed to convert ${file}:`, err);
            failed++;
        }
    }
    console.log(`Done! Converted: ${converted}, Failed: ${failed}`);
}

main().catch(console.error);
