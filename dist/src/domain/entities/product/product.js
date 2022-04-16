"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const entities_1 = require("../../../core/domain/entities");
class Product extends entities_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    get name() {
        return this.props.name;
    }
    get id() {
        return this._id;
    }
    static create(props, id) {
        const product = new Product(props, id);
        return product;
    }
}
exports.Product = Product;
