
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const docsDir = path.join(process.cwd(), 'docs');
const registryPath = path.join(process.cwd(), 'src', 'registry.json');
const registryRegeneratedPath = path.join(process.cwd(), 'src', 'registry.json'); // Same path

function getFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;

    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            getFiles(filePath, fileList);
        } else {
            if (file.endsWith('.md') || file.endsWith('.mdx')) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

function generateRegistry() {
    const files = getFiles(docsDir);
    const registry = [];

    files.forEach(filePath => {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        const relativePath = path.relative(docsDir, filePath);

        // Only include if title exists
        if (data.title) {
            registry.push({
                title: data.title,
                path: relativePath, // Keep path relative to docs rooted at /
                // Use current date if not specified, or parsing from git history could be an option but simpler is better for now
                date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
                authors: data.authors || [],
                tags: data.tags || [],
                pinned: data.pinned || false
            });
        }
    });

    fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
    console.log(`Registry generated with ${registry.length} items.`);
}

generateRegistry();
