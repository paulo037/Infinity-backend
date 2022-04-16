"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../../../core/domain/entities");
class SaleHasProduct extends entities_1.Entity {
    constructor(props) {
        super(props);
    }
    static create(props) {
        const saleHasProduct = new SaleHasProduct(props);
        return saleHasProduct;
    }
}
