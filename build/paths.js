const path = require('path');

const projectDir = process.cwd();
const sourceDir = path.join(projectDir, 'modules');
const targetDir = path.join(projectDir, 'target');
const typingsDir = path.join(projectDir, 'typings');
const nodeModulesDir = path.join(projectDir, 'node_modules');
const nodeModulesBinariesDir = path.join(nodeModulesDir, '.bin');

module.exports = {
    projectDir,
    sourceDir,
    targetDir,
    typingsDir,
    nodeModulesDir,
    nodeModulesBinariesDir
};
