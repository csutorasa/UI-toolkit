const typescript = require('../typescript');

typescript.compile().then(() => {
    console.log('Build succeed!');
}, err => {
    console.error(err);
    console.error('Build failed!');
});
