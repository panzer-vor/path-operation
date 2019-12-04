(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("./core");
    var createInstance = function (state, config) {
        var context = new core_1.PathOperator(state, config);
        return function (path, mapFn) {
            var pathContext = context.createPath(path);
            if (typeof mapFn === 'undefined') {
                return pathContext;
            }
            return pathContext(mapFn);
        };
    };
    exports.default = createInstance;
});
//# sourceMappingURL=index.js.map