"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Size = void 0;
const entities_1 = require("../../../core/domain/entities");
class Size extends entities_1.Entity {
    constructor(props) {
        super(props);
    }
    get value() {
        return this.props.value;
    }
    get id() {
        return this.id;
    }
    static create(props) {
        const size = new Size(props);
        return size;
    }
}
exports.Size = Size;
