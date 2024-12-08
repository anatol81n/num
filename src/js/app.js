import Form from "./form";
import Result from "./result";
import {MaskInput} from "maska";
import TagCloud from 'TagCloud';

export default class {
    constructor(wrapper) {
        import("../css/app.css")
        this.wrapper = wrapper;
    }
    create() {
        const form = new Form();
        this.wrapper.append(form.dom);
        form.InputsEventHandlers = {
            num: numEventHandlers(form),
        };
        setInputMasks(form.dom);
        const result = new Result();
        this.wrapper.append(result.dom);
        form.submit = event => {
            event.preventDefault();
            result.content = '';
            TagCloud(result.dom,form.dom.elements.num.value.split(''), {
                radius: 120,
                initSpeed: "fast",
            });
        }
    }
}

const numEventHandlers = form => ({
    "blur": event => {
        const input = event.target;
        if (input.value.length > 1) {
            form.setValidInput(input.name);
            validate(form);
        } else {
            input.classList.add("error");
            form.setInvalidInput(input.name);
        }
    },
    "input": event => {
        event.target.classList.remove("error");
    }
});


const setInputMasks = form => {
    new MaskInput(form.elements.num, {
        mask: () => "#".repeat(9),
    });
}


const validate = form => {
    if (form.isValid) {
        form.enableSubmitButton();
    } else {
        form.disableSubmitButton();
    }
}
