const path = require('path');
const fs = require('fs');
const nodeSass = require('node-sass');

const projectDir = process.cwd();
const nodeSassFile = path.join(projectDir, 'node_modules', '.bin', 'node-sass');
const sourceFile = path.join(projectDir, 'modules', 'main.scss');
const targetDir = path.join(projectDir, 'target');
const targetFile = path.join(targetDir, 'main.css');


function sass(outputstyle) {
    return new Promise((resolve, reject) => {
        nodeSass.render({
            file: sourceFile,
            'output-style': 'compressed'
        }, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        })

    });
}

function writeToFile(data) {
    try {
        fs.statSync(targetDir);
    }
    catch(ex) {
        fs.mkdirSync(targetDir);
    }
    fs.writeFileSync(targetFile, data);
}

function compile() {
    return sass().then(output => {
        if(output.stdout) {
            writeToFile(output.stdout);
        }
    });
}

module.exports = {
    compile
};
