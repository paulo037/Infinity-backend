"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductHasCategory = void 0;
const entities_1 = require("../../../core/domain/entities");
class ProductHasCategory extends entities_1.Entity {
    constructor(props) {
        super(props);
    }
    static create(props) {
        const productHasCategory = new ProductHasCategory(props);
        return productHasCategory;
    }
}
exports.ProductHasCategory = ProductHasCategory;
