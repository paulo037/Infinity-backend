"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = void 0;
const validation_1 = require("../../../domain/validation/validation");
class DeleteUser {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }
    async execute({ id }) {
        const UserExist = await this.UserRepository.findById(id);
        validation_1.Validation.existOrError(UserExist, "Produto não encontrado");
        return this.UserRepository.delete(id);
    }
}
exports.DeleteUser = DeleteUser;
