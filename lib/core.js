var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PathOperator = /** @class */ (function () {
        function PathOperator(state, config) {
            this.config = {
                mutable: true,
                defaultPath: []
            };
            this.state = state;
            this.config = __assign({}, this.config, config);
        }
        PathOperator.prototype.createPath = function (path) {
            var _this = this;
            var paths = this.config.defaultPath.concat(path);
            var pathInstance = function (mapFn) {
                var subPathOperator = function (loopObj, paths, mapFn) {
                    var _a, _b, _c;
                    var currentPath = paths.shift();
                    var newValue = loopObj[currentPath];
                    if (paths.length) {
                        return __assign({}, loopObj, (_a = {}, _a[currentPath] = subPathOperator(newValue, paths, mapFn), _a));
                    }
                    else {
                        return typeof mapFn === "function" ? __assign({}, loopObj, (_b = {}, _b[currentPath] = mapFn(newValue), _b)) : __assign({}, loopObj, (_c = {}, _c[currentPath] = mapFn, _c));
                    }
                };
                var newObj = subPathOperator(_this.state, paths, mapFn);
                _this.config.mutable && (_this.state = newObj);
                return newObj;
            };
            pathInstance.getValue = this.getPathValue(path);
            return pathInstance;
        };
        PathOperator.prototype.getPathValue = function (path) {
            var _this = this;
            return function () {
                var paths = _this.config.defaultPath.concat(path);
                var subPathOperator = function (loopObj, paths) {
                    var currentPath = paths.shift();
                    var newValue = loopObj[currentPath];
                    if (paths.length) {
                        return subPathOperator(newValue, paths);
                    }
                    else {
                        return newValue;
                    }
                };
                return subPathOperator(_this.state, paths);
            };
        };
        return PathOperator;
    }());
    exports.PathOperator = PathOperator;
});
//# sourceMappingURL=core.js.map