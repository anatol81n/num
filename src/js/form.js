import {makel, evans} from "makel-dom";

export default class {
    constructor() {
        this._form = makel("form.form-container",
            makel("div.field-container",
                makel("label[for=num]", "Число"),
                makel("input[id=num][type=text][name=num]")
            ),
            makel("button[type=submit][name=submit][disabled=disabled]", "шо там"),
        );
        this._valid = {num: false};
    }

    get dom() {
        return this._form;
    }

    set submit(handler) {
        this.dom.addEventListener('submit', handler);
    }

    set InputsEventHandlers(elements) {
        for (const elementName in elements) {
            if (this.dom.elements[elementName]) {
                for (const handleName in elements[elementName]) {
                    evans(this.dom.elements[elementName], {
                        [handleName]: elements[elementName][handleName]
                    });
                }
            }
        }
    }
    enableSubmitButton() {
        this.dom.querySelector("button[type=submit]").disabled = false;
    }
    disableSubmitButton() {
        this.dom.querySelector("button[type=submit]").disabled = true;
    }
    setValidInput(input) {
        this._valid[input] = true;
    }

    setInvalidInput(input) {
        this._valid[input] = false;
    }

    get isValid() {
        let result = true;
        for (const current in this._valid) {
            result = result && this._valid[current];
        }
        return result;
    }
}

