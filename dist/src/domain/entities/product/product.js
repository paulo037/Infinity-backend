"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const entities_1 = require("../../../core/domain/entities");
class Product extends entities_1.Entity {
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
        const product = new Product(props);
        return product;
    }
}
exports.Product = Product;
