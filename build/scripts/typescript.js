const typescript = require('../typescript');

typescript.compile().then(() => {
    console.log('Build succeed!');
}, () => {
    console.error('Build failed!');
});
