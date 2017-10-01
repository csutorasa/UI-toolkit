const child_process = require('child_process');
const path = require('path');

if(process.env.BUILD_LIBRARY === 1 || process.env.BUILD_LIBRARY === 'true') {
    console.log('Building workspace version of library.')
    child_process.execSync('npm install', { cwd: path.join(__dirname, 'wizyx') });
}