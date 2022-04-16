"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const entities_1 = require("../../../core/domain/entities");
class User extends entities_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    get email() {
        return this.props.email;
    }
    get id() {
        return this._id;
    }
    static create(props, id) {
        const user = new User(props, id);
        return user;
    }
}
exports.User = User;
