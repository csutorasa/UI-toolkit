const path = require('path');
const fs = require('fs');
const paths = require('./paths');

function compile() {
    console.log('Cleaning...');

    try {
        fs.statSync(paths.targetDir);
    } catch (ex) {
        // target does not exist
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        try {
            const files = fs.readdirSync(paths.targetDir);
            for(let file of files) {
                fs.unlinkSync(path.join(paths.targetDir, file));
            }
            fs.rmdirSync(paths.targetDir);
            resolve();
        } catch (err) {
            reject(err);
        } 
    });
}

module.exports = {
    compile
};
