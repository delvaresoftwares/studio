import { readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import ts from 'typescript';

/**
 * Loads a self-contained TypeScript data module on plain Node by transpiling it
 * to CommonJS in a temporary file. Shared by the summary generator, the
 * validator and the OG image generator so every script reads the same source of
 * truth as the app.
 */
export function loadTsModule(relativePath) {
    const sourcePath = resolve(process.cwd(), relativePath);
    const source = readFileSync(sourcePath, 'utf8');
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2020,
            esModuleInterop: true,
        },
        fileName: sourcePath,
    });

    const tempPath = join(tmpdir(), `delvare-data-${process.pid}-${Date.now()}.cjs`);
    writeFileSync(tempPath, outputText);

    try {
        const require = createRequire(import.meta.url);
        delete require.cache[tempPath];
        return require(tempPath);
    } finally {
        unlinkSync(tempPath);
    }
}

export function loadBlogs() {
    return loadTsModule('src/lib/blogs.ts');
}
