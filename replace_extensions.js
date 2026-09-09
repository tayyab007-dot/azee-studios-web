const glob = require('glob');
const fs = require('fs');

async function main() {
    const files = glob.sync('{app,components,constants}/**/*.{ts,tsx,js,jsx}');
    
    let changedFiles = 0;
    
    for (const file of files) {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = content;
        
        // Regex to match image extensions in strings, e.g. "/logo.png" or "image.jpg"
        // This is a bit tricky, but we can replace .png, .jpg, .jpeg, .avif with .webp
        // Ensure they are preceded by word chars or slashes, and followed by quote or backtick
        newContent = newContent.replace(/(\.[a-zA-Z0-9_\-\/]+)\.(png|jpg|jpeg)(['"`])/gi, '$1.webp$3');
        
        // Also just replace standard strings with extensions
        newContent = newContent.replace(/\.png(['"`])/gi, '.webp$1');
        newContent = newContent.replace(/\.jpg(['"`])/gi, '.webp$1');
        newContent = newContent.replace(/\.jpeg(['"`])/gi, '.webp$1');
        
        // Let's do a more robust replace for typical Next.js paths
        // e.g. src="/logo.png" -> src="/logo.webp"
        
        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            changedFiles++;
            console.log(`Updated ${file}`);
        }
    }
    
    console.log(`Updated ${changedFiles} files with .webp extension`);
}

main().catch(console.error);
