"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductHasSize = void 0;
const entities_1 = require("../../../core/domain/entities");
class ProductHasSize extends entities_1.Entity {
    constructor(props) {
        super(props);
    }
    static create(props) {
        const productHasSize = new ProductHasSize(props);
        return productHasSize;
    }
}
exports.ProductHasSize = ProductHasSize;
