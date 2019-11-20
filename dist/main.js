(function(modules) {
            function require(filename) {
                var fn = modules[filename];
                var module = { exports: {}};
                fn(require, module, module.exports);
                return module.exports;
            }

            require('/Users/maqixiang/Desktop/code/simple-webpack/src/index.js')
        })({'/Users/maqixiang/Desktop/code/simple-webpack/src/index.js': function(require, module, exports){"use strict";

var _test = require("./test.js");

document.write((0, _test.test)('123'));},'./test.js': function(require, module, exports){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = test;
function test(name) {
  return name;
}},})