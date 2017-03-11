const exec = require('child_process').exec;
const path = require('path');
const paths = require('./paths');

function compile() {
    console.log('Building typings...');
    const typings = path.join(paths.projectDir, 'node_modules', '.bin', 'typings');

    let err;
    let output;
    const typingsProcess = exec(typings + ' install', (error, stdout, stderr) => {
        err = error;
        output = {
            stdout,
            stderr
        };
    });

    return new Promise((resolve, reject) => {
        typingsProcess.on('close', (code, signal) => {
            if (err) {
                reject(err);
            } else if (code !== 0) {
                reject('Return code is ' + code);
            } else {
                console.log(output.stdout);
                resolve();
            }
        });
    });
}

module.exports = {
    compile
};