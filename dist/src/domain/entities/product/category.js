"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const entities_1 = require("../../../core/domain/entities");
class Category extends entities_1.Entity {
    constructor(props) {
        super(props);
    }
    get name() {
        return this.props.name;
    }
    get id() {
        return this.props.id;
    }
    static create(props) {
        const category = new Category(props);
        return category;
    }
}
exports.Category = Category;
