(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'jquery', 'knockout'], factory);
    }
})(function (require, exports) {
    "use strict";
    var $ = require('jquery');
    var ko = require('knockout');
    ko.components.register("helloworld", {
        template: require("components/hello-world/hello-world.html"),
        viewModel: require("components/hello-world/hello-world")
    });
    $(function () {
        ko.applyBindings({});
    });
});
//# sourceMappingURL=main.js.map