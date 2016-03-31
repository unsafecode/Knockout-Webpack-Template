import * as $ from 'jquery';
import * as ko from 'knockout';

ko.components.register("helloworld", {
    template: require("./components/hello-world/hello-world.html"),
    viewModel: require("./components/hello-world/hello-world")
});

$(() => {

    ko.applyBindings({});
});