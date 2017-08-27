import { View, Style, Property, CssProperty, EventData } from "tns-core-modules/ui/core/view";

export class RadioButton extends View {
    // static field used from component-builder module to find events on controls.
    static tapEvent: string; 

    // Defines the text property.
    text: string;

    // Defines the text property.
    isChecked: boolean;

    // Overload 'on' method so that it provides intellisense for 'tap' event.
    on(event: "tap", callback: (args: EventData) => void, thisArg?: any);

    // Needed when 'on' method is overriden.
    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
}

export const textProperty: Property<RadioButton, string>;
export const icCheckedProperty: Property<RadioButton, boolean>;
