const path = require('path');
const fs = require('fs');
const nodeSass = require('node-sass');
const paths = require('./paths');

function sass(outputstyle) {
    const sourceFile = path.join(paths.sourceDir, 'main.scss');
    return new Promise((resolve, reject) => {
        nodeSass.render({
            file: sourceFile,
            outputStyle: 'compressed'
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
    const targetFile = path.join(paths.targetDir, 'main.css');
    try {
        fs.statSync(paths.targetDir);
    }
    catch(ex) {
        fs.mkdirSync(paths.targetDir);
    }
    fs.writeFileSync(targetFile, data);
}

function compile() {
    console.log('Building sass...');
    return sass().then(output => {
        writeToFile(output.css);
    });
}

module.exports = {
    compile
};
