import {makel} from "makel-dom";
export default class {
    constructor() {
        this._dom = makel("div.form-container",
            makel("p.result",
            ),
        );
    }
    get dom() {
        return this._dom;
    }
    set content(content) {
        this._dom.textContent = content;
    }
}
