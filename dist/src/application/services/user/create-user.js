"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const validation_1 = require("../../../domain/validation/validation");
const user_1 = require("../../../domain/entities/user/user");
class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ first_name, last_name, image, password, confirmPassword, email, cpf, admin }) {
        validation_1.Validation.existOrError(email, "E-mail não informado");
        validation_1.Validation.validEmailOrError(email, "Email mal formatado");
        validation_1.Validation.existOrError(name, "Nome não informado");
        validation_1.Validation.existOrError(password, "Senha não informada");
        validation_1.Validation.existOrError(confirmPassword, "Confirmação de senha não informada");
        validation_1.Validation.existOrError(cpf, "CPF não informado");
        validation_1.Validation.equalsOrError(password, confirmPassword, "Senhas não conferem");
        const userWithEmailExist = await this.userRepository.findByEmail(email);
        validation_1.Validation.notExistOrError(userWithEmailExist, "Já existe uma conta vinculada há esse email");
        const user = user_1.User.create({
            first_name,
            last_name,
            image,
            password,
            email,
            cpf,
            admin
        });
        this.userRepository.create(user);
    }
}
exports.CreateUser = CreateUser;
