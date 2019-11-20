const { getAST, getDependencies, transform } = require('./parser');
const path = require('path');
const fs =require('fs');

module.exports = class Compiler{
    
    constructor(options) {
        const { entry, output } = options;

        this.entry = entry;
        this.output = output;
        this.modules = [];
    }

    run() {
        const entryModule = this.buildMoudle(this.entry, true);

        this.modules.push(entryModule);

        this.modules.map(_module => {
            _module.dependencies.map(denpendency => {
                this.modules.push(this.buildMoudle(denpendency));
            })
        })

        this.emitFiles();
    }

    buildMoudle(filename, isEntry) {
        let ast;

        if (isEntry) {
            ast = getAST(filename);
        } else {
            ast = getAST(path.join(process.cwd(), './src', filename))
        }

        return {
            filename,
            dependencies: getDependencies(ast),
            source: transform(ast)
        }
    }

    emitFiles() {
        const outputPath = path.join(this.output.path, this.output.filename);

        let modules = '';

        this.modules.map(_module => {
            modules += `'${_module.filename}': function(require, module, exports){${_module.source}},`
        })

        const bundle = `(function(modules) {
            function require(filename) {
                var fn = modules[filename];
                var module = { exports: {}};
                fn(require, module, module.exports);
                return module.exports;
            }

            require('${this.entry}')
        })({${modules}})`;
        fs.writeFileSync(outputPath, bundle, 'utf-8');
    }

}