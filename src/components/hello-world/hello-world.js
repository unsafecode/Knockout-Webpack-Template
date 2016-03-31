(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "knockout", "./hello-world.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ko = require("knockout");
    require("./hello-world.css");
    var HelloWorldViewModel = (function () {
        function HelloWorldViewModel(parameters) {
            this.Name = ko.observable("");
            this.Name(parameters.Name);
        }
        return HelloWorldViewModel;
    }());
    exports.HelloWorldViewModel = HelloWorldViewModel;
    function createViewModel(params) {
        return new HelloWorldViewModel(params);
    }
    exports.createViewModel = createViewModel;
});
//# sourceMappingURL=hello-world.js.map