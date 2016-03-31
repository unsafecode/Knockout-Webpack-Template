import * as ko from "knockout";
import "./hello-world.css";

export /**
 * HelloWorldViewModel
 */
class HelloWorldViewModel {
    
    public Name: KnockoutObservable<string> = ko.observable("");
    
    constructor(parameters) {
        this.Name(parameters.name);
    }
}

export function createViewModel(params) {
    return new HelloWorldViewModel(params);
}