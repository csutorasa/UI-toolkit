const child_process = require('child_process');
const path = require('path');

if(process.env.BUILD_LIBRARY === '1' || process.env.BUILD_LIBRARY === 'true') {
    console.log('Building workspace version of library.');
    const directory = path.join(__dirname, 'wizyx');
    let command = 'npm install';
    console.log(directory + '/' + command);
    child_process.execSync(command, { cwd: directory });
    command = 'npm run rebuild';
    console.log(directory + '/' + command);
    child_process.execSync(command, { cwd: directory });
}