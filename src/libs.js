(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "knockout", "jquery", "moment", "underscore"], factory);
    }
})(function (require, exports) {
    "use strict";
    require("knockout");
    require("jquery");
    require("moment");
    require("underscore");
});
//# sourceMappingURL=libs.js.map