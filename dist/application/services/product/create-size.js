"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSize = void 0;
const size_1 = require("../../../domain/entities/product/size");
const validation_1 = require("../../../domain/validation/validation");
class CreateSize {
    constructor(SizeRepository) {
        this.SizeRepository = SizeRepository;
    }
    async execute({ value }) {
        const SizeExist = await this.SizeRepository.findByValue(value);
        validation_1.Validation.notExistOrError(SizeExist, "Um tamanho com esse valor já existe");
        const size = size_1.Size.create({
            value
        });
        this.SizeRepository.create(size);
    }
}
exports.CreateSize = CreateSize;
