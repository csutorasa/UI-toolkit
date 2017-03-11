const path = require('path');

const projectDir = process.cwd();
const sourceDir = path.join(projectDir, 'modules');
const targetDir = path.join(projectDir, 'target');

module.exports = {
    projectDir,
    sourceDir,
    targetDir
};
