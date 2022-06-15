"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const entities_1 = require("../../../core/domain/entities");
class User extends entities_1.Entity {
    constructor(props) {
        super(props);
    }
    get email() {
        return this.props.email;
    }
    get id() {
        return this.props.id;
    }
    static create(props) {
        const user = new User(props);
        return user;
    }
}
exports.User = User;
