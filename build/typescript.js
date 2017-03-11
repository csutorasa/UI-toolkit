const typescript = require('typescript');
const path = require('path');
const paths = require('./paths');

function compile() {
    const sourceFile = path.join(paths.sourceDir, "main.ts");

    const program = typescript.createProgram([sourceFile], {
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        target: typescript.ScriptTarget.ES5,
        module: typescript.ModuleKind.CommonJS,
        moduleResolution: typescript.ModuleResolutionKind.NodeJs,
        removeComments: true,
        rootDir: paths.sourceDir,
        outDir: paths.targetDir
    });

    const emitResult = program.emit();

    const allDiagnostics = typescript.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    let generalErrors = [];

    allDiagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
            const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            const message = typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
            generalErrors.push(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        }
        else {
            generalErrors.push(diagnostic.messageText);
        }
    });


    if (generalErrors.length !== 0) {
        return Promise.reject(generalErrors.join('\n'));
    } else if (emitResult.emitSkipped) {
        return Promise.reject('Typescript emit skipped!');
    } else  {
        return Promise.resolve();
    }
}

module.exports = {
    compile
}