const path = require('path');

const projectDir = process.cwd();
const sourceDir = path.join(projectDir, 'modules');
const targetDir = path.join(projectDir, 'target');
const targetUIToolkitDir = path.join(targetDir, 'uitoolkit');
const nodeModulesDir = path.join(projectDir, 'node_modules');
const nodeModulesBinariesDir = path.join(nodeModulesDir, '.bin');

module.exports = {
    projectDir,
    sourceDir,
    targetDir,
    targetUIToolkitDir,
    nodeModulesDir,
    nodeModulesBinariesDir
};
