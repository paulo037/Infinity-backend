"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const entities_1 = require("../../../core/domain/entities");
class Category extends entities_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    get name() {
        return this.props.name;
    }
    static create(props, id) {
        const category = new Category(props, id);
        return category;
    }
}
exports.Category = Category;
