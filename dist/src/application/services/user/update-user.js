"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = void 0;
const user_1 = require("../../../domain/entities/user/user");
const validation_1 = require("../../../domain/validation/validation");
class UpdateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ first_name, last_name, id, image, password, confirmPassword, email, cpf, admin, }) {
        const user = await this.userRepository.findById(id);
        validation_1.Validation.existOrError(user, "Produto não encontrado.");
        validation_1.Validation.existOrError(email, "E-mail não informado");
        validation_1.Validation.validEmailOrError(email, "Email mal formatado");
        validation_1.Validation.existOrError(name, "Nome não informado");
        validation_1.Validation.existOrError(password, "Senha não informada");
        validation_1.Validation.existOrError(confirmPassword, "Confirmação de senha não informada");
        validation_1.Validation.existOrError(cpf, "CPF não informado");
        validation_1.Validation.equalsOrError(password, confirmPassword, "Senhas não conferem");
        const userUpdate = user_1.User.create({
            first_name,
            last_name,
            image,
            password,
            email,
            cpf,
            admin,
            id
        });
        this.userRepository.update(userUpdate);
    }
}
exports.UpdateUser = UpdateUser;
