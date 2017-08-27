import { RadioButton as ButtonDefinition } from "./index";
import { View, Style, Property, CssProperty, isIOS } from "tns-core-modules/ui/core/view";

export const textProperty = new Property<RadioButtonBase, string>({ name: "text", defaultValue: "", affectsLayout: isIOS });
export const isCheckedProperty = new Property<RadioButtonBase, boolean>({ name: "isChecked", defaultValue: false, affectsLayout: false });

export abstract class RadioButtonBase extends View implements ButtonDefinition {
    public static tapEvent = "tap";
    text: string;
    isChecked: boolean;
}

// Defines 'text' property on MyButtonBase class.
textProperty.register(RadioButtonBase);
isCheckedProperty.register(RadioButtonBase);