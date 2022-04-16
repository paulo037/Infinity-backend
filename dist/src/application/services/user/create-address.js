"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAddress = void 0;
const address_1 = require("../../../domain/entities/user/address");
const validation_1 = require("../../../domain/validation/validation");
class CreateAddress {
    constructor(AddressRepository) {
        this.AddressRepository = AddressRepository;
    }
    async execute({ name, estate, city, district, street, cep, telephone, number, user_id, }) {
        const AddressWithUserIdExist = await this.AddressRepository.findByUserId(user_id);
        validation_1.Validation.notExistOrError(AddressWithUserIdExist, "O usuário para qual o endereço está sendo crido não foi encontrado");
        const address = address_1.Address.create({
            name,
            estate,
            city,
            district,
            street,
            cep,
            telephone,
            number,
            user_id,
        });
        this.AddressRepository.create(address);
    }
}
exports.CreateAddress = CreateAddress;
