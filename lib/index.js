const Compiler = require('./compiler');
const options = require('../simplepack.conf');


const c = new Compiler(options);

c.run();