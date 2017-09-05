import { RadioButton as RadioDefinition, RadioGroup as GroupDefinition } from "./radio";
import { Button } from "tns-core-modules/ui/button";
import { TextBase, Property, CssProperty, Style, Color, FormattedString } from "tns-core-modules/ui/text-base";
import { booleanConverter }  from "tns-core-modules/ui/core/view-base"; 
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';

export * from "tns-core-modules/ui/text-base";

export const tintProperty = new Property<RadioButtonBase, string>({ name: "tint", defaultValue: "" });
export const checkedProperty = new Property<RadioButtonBase, boolean>({ name: "checked", defaultValue: false, valueConverter: booleanConverter });

export abstract class RadioButtonBase extends TextBase implements RadioDefinition {
    tint: string;
    checked: boolean;
}

tintProperty.register(RadioButtonBase);
checkedProperty.register(RadioButtonBase);

export const checkedButtonProperty = new Property<RadioGroupBase, number>({ name: "checkedButton", defaultValue: -1, affectsLayout: false });

export abstract class RadioGroupBase extends StackLayout implements GroupDefinition {

    static checkedChangedEvent = "checkedChanged"; 

    checkedButton: number;
}

checkedButtonProperty.register(RadioGroupBase);