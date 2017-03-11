const build = require('./common').build;
const sass = require('../sass');

build(sass.compile());
