const child_process = require('child_process');
const path = require('path');

if(process.env.BUILD_LIBRARY === 1 || process.env.BUILD_LIBRARY === 'true') {
    const directory = path.join(__dirname, 'wizyx');
    const command = 'npm install';
    console.log('Building workspace version of library.');
    console.log(directory + '/' + command);
    child_process.execSync(command, { cwd: directory });
}