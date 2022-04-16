"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const entities_1 = require("../../../core/domain/entities");
class Cart extends entities_1.Entity {
    constructor(props) {
        super(props);
    }
    static create(props) {
        const cart = new Cart(props);
        return cart;
    }
}
exports.Cart = Cart;
