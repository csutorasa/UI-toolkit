const build = require('./common').build;
const clean = require('../clean');

build(clean.compile());
