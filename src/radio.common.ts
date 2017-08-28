import { RadioButton as RadioDefinition, RadioGroup as GroupDefinition } from "./radio";
import { Button } from "tns-core-modules/ui/button";
import { TextBase, Property, CssProperty, Style, Color, FormattedString } from "tns-core-modules/ui/text-base";
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';

export * from "tns-core-modules/ui/text-base";

export const tintProperty = new Property<RadioButtonBase, string>({ name: "tint", defaultValue: "", affectsLayout: false });

export abstract class RadioButtonBase extends TextBase implements RadioDefinition {
    // public static tapEvent = "tap";
    tint: string;
}

// // Augmenting Style definition so it includes our myOpacity property
// declare module "tns-core-modules/ui/styling/style" {
//     interface Style {
//         myOpacity: number;
//     }
// }

// // Defines 'text' property on MyButtonBase class.
// textProperty.register(MyButtonBase);

tintProperty.register(RadioButtonBase);

export const checkedButtonProperty = new Property<RadioGroupBase, number>({ name: "checkedButton", defaultValue: -1, affectsLayout: false });

export abstract class RadioGroupBase extends StackLayout implements GroupDefinition {

    static checkedChangedEvent = "checkedChanged"; 

    checkedButton: number;
}

checkedButtonProperty.register(RadioGroupBase);