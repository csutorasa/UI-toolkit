const path = require('path');
const fs = require('fs');
const paths = require('./paths');

const name = 'Cleaning';

function recursiveRemove(dirpath) {
    const files = fs.readdirSync(dirpath);
    for(let file of files) {
        const p = path.join(dirpath, file);
        if(fs.statSync(p).isDirectory()) {
            recursiveRemove(p);
        } else {
            fs.unlinkSync(p);
        }
    }
    fs.rmdirSync(dirpath);
}

function compile() {
    try {
        fs.statSync(paths.targetDir);
    } catch (ex) {
        // target does not exist
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        try {
            recursiveRemove(paths.targetDir);
            resolve();
        } catch (err) {
            reject(err);
        } 
    });
}

module.exports = {
    compile,
    name
};
