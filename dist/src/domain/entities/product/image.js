"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const entities_1 = require("../../../core/domain/entities");
class Image extends entities_1.Entity {
    constructor(props) {
        super(props);
    }
    static create(props) {
        const image = new Image(props);
        return image;
    }
}
exports.Image = Image;
