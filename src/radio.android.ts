import { RadioButtonBase, tintProperty, RadioGroupBase, checkedButtonProperty, checkedProperty } from "./radio.common";
import { TextBase, Property, CssProperty, Style, Color, FormattedString } from "tns-core-modules/ui/text-base";
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';

export * from "./radio.common";

interface IRadioGroupCheckedChangeListener {
    new(owner: RadioGroup): android.widget.RadioGroup.OnCheckedChangeListener;
}

interface IRadioButtonCheckedChangeListener {
    new(owner: RadioButton): android.widget.CompoundButton.OnCheckedChangeListener;
}

let RadioGroupCheckedChangeListener: IRadioGroupCheckedChangeListener;
let RadioButtonCheckedChangeListener: IRadioButtonCheckedChangeListener;

function initializeRadioGroupCheckedChangeListener(): void {
    if (RadioGroupCheckedChangeListener) {
        return;
    }

    @Interfaces([android.widget.RadioGroup.OnCheckedChangeListener])
    class RadioGroupCheckedChangeListenerImpl extends java.lang.Object implements android.widget.RadioGroup.OnCheckedChangeListener {

        constructor(public owner: RadioGroup) {
            super();
            return global.__native(this);
        }

        private getCheckedButton(owner: RadioGroup, checkedId: number): RadioButton {

            if (checkedId != -1) {
                var radioButton = owner.android.findViewById(checkedId);
                return radioButton.owner;
            }

            return null;
        }

        public onCheckedChanged(group: android.widget.RadioGroup, checkedId: number) {

            const owner = (<any>group).owner as RadioGroup;
            if (owner) {
                checkedButtonProperty.nativeValueChange(owner, checkedId);
                owner.notify({
                    eventName: "checkedChanged", 
                    object: owner, 
                    button: this.getCheckedButton(owner, checkedId)
                });
            }
        }
    }

    RadioGroupCheckedChangeListener = RadioGroupCheckedChangeListenerImpl;
}

function initializeRadioButtonCheckedChangeListener(): void {
    if (RadioButtonCheckedChangeListener) {
        return;
    }

    @Interfaces([android.widget.CompoundButton.OnCheckedChangeListener])
    class RadioButtonCheckedChangeListenerImpl extends java.lang.Object implements android.widget.CompoundButton.OnCheckedChangeListener {

        constructor(public owner: RadioButton) {
            super();
            return global.__native(this);
        }

        public onCheckedChanged(group: android.widget.RadioButton, isChecked: boolean) {

            const owner = (<any>group).owner as RadioButton;
            if (owner) {
                //TODO: Which is better?
                //owner.checked = isChecked
                checkedProperty.nativeValueChange(owner, isChecked);
            }
        }
    }

    RadioButtonCheckedChangeListener = RadioButtonCheckedChangeListenerImpl;
}

let clickListener: android.view.View.OnClickListener;

// NOTE: ClickListenerImpl is in function instead of directly in the module because we 
// want this file to be compatible with V8 snapshot. When V8 snapshot is created
// JS is loaded into memory, compiled & saved as binary file which is later loaded by
// android runtime. Thus when snapshot is created we don't have android runtime and
// we don't have access to native types.
function initializeClickListener(): void {
    // Define ClickListener class only once.
    if (clickListener) {
        return;
    }

    // Interfaces decorator with implemented interfaces on this class
    @Interfaces([android.view.View.OnClickListener])
    class ClickListener extends java.lang.Object implements android.view.View.OnClickListener {
        public owner: RadioButton;

        constructor() {
            super();
            // Required by android runtime when native class is extended through TypeScript.
            return global.__native(this);
        }

        public onClick(v: android.view.View): void {
            // When native button is clicked we raise 'tap' event.
            const owner = (<any>v).owner;
            if (owner) {
                //owner.notify({ eventName: MyButtonBase.tapEvent, object: owner });
            }
        }
    }

    clickListener = new ClickListener();
}


export class RadioButton extends RadioButtonBase {

    nativeView: android.widget.RadioButton;

    public createNativeView(): Object {
        initializeClickListener();
        initializeRadioButtonCheckedChangeListener();

        const button = new android.widget.RadioButton(this._context);

        var checkedChangeListener = new RadioButtonCheckedChangeListener(this);
        button.setOnClickListener(clickListener);
        button.setOnCheckedChangeListener(checkedChangeListener);
        (<any>button).checkedChangeListener = checkedChangeListener;

        return button;
    }

    initNativeView(): void {
        (<any>this.nativeView).owner = this;
        (<any>this.nativeView).checkedChangeListener.owner = this;
        super.initNativeView();
    }

    disposeNativeView(): void {
        (<any>this.nativeView).owner = null;
        (<any>this.nativeView).checkedChangeListener.owner = null;
        super.disposeNativeView();
    }

    [tintProperty.setNative](value: string) {

        //TODO: add check for sdkVersion 
        var color = android.graphics.Color.parseColor(value);
        (<any>this.nativeView).setButtonTintList(android.content.res.ColorStateList.valueOf(color));
    }

    [checkedProperty.setNative](isChecked: boolean) {
        return this.nativeView.setChecked(isChecked);
    }
}

export class RadioGroup extends RadioGroupBase {

    nativeView: android.widget.RadioGroup;

    public createNativeView(): Object {
        const view = new android.widget.RadioGroup(this._context);
        initializeRadioGroupCheckedChangeListener();
        const checkedChangeListener = new RadioGroupCheckedChangeListener(this);
        view.setOnCheckedChangeListener(checkedChangeListener);
        (<any>view).checkedChangeListener = checkedChangeListener;

        return view;
    }

    initNativeView(): void {
        (<any>this.nativeView).owner = this;
        (<any>this.nativeView).checkedChangeListener.owner = this;
        super.initNativeView();
    }

    disposeNativeView(): void {
        (<any>this.nativeView).owner = null;
        (<any>this.nativeView).checkedChangeListener.owner = null;
        super.disposeNativeView();
    }
}