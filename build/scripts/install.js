const typescript = require('../typescript');
const sass = require('../sass');

Promise.all([
    typescript.compile(),
    sass.compile()
]).then(() => {
    console.log('Build succeed!');
}, err => {
    console.error(err);
    console.error('Build failed!');
});
