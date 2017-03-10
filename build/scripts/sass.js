const sass = require('../sass');

sass.compile().then(() => {
    console.log('Build succeed!');
}, err => {
    console.error(err);
    console.error('Build failed!');
});
