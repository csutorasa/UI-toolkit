const build = require('./common').build;
const clean = require('../clean');
const typescript = require('../typescript');
const sass = require('../sass');

build(clean.compile().then(() => Promise.all([
    typescript.compile(),
    sass.compile()
])));
