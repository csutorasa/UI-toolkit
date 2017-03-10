const sass = require('../sass');

sass.compile().then(() => {
    console.log('Build succeed!');
}, () => {
    console.error('Build failed!');
});
