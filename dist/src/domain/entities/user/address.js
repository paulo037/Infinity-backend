"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const entities_1 = require("../../../core/domain/entities");
const validation_1 = require("../../validation/validation");
class Address extends entities_1.Entity {
    constructor(props) {
        super(props);
    }
    static create(props) {
        validation_1.Validation.existOrError(props.name, "Nome do enderesso não foi informado");
        validation_1.Validation.existOrError(props.cep, " O CEP  não foi informado");
        validation_1.Validation.existOrError(props.estate, "O estado não foi informado");
        validation_1.Validation.existOrError(props.city, "A cidade não foi informada");
        validation_1.Validation.existOrError(props.district, "O bairro não foi informado");
        validation_1.Validation.existOrError(props.street, "A rua não foi informada");
        validation_1.Validation.existOrError(props.telephone, "O número de celular não informado");
        validation_1.Validation.existOrError(props.user_id, "Usuário não informado");
        const address = new Address(props);
        return address;
    }
}
exports.Address = Address;
