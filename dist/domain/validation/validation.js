"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
class Validation {
    static existOrError(value, msg) {
        if (!value)
            throw new Error(msg);
        if (Array.isArray(value) && value.length === 0)
            throw new Error(msg);
        if (typeof value === 'string' && !value.trim())
            throw new Error(msg);
    }
    static notExistOrError(value, msg) {
        try {
            this.existOrError(value, msg);
        }
        catch (msg) {
            return;
        }
        throw new Error(msg);
    }
    static equalsOrError(valueA, valueB, msg) {
        if (typeof valueA === 'object' && typeof valueB === 'object') {
            let akeys = Object.keys(valueA);
            let bkeys = Object.keys(valueB);
            if (akeys.length != bkeys.length) {
                throw new Error(msg);
            }
            let different = akeys.some((chave) => {
                return valueA[chave] !== valueB[chave];
            });
            if (different)
                throw new Error(msg);
        }
        else {
            if (valueA != valueB)
                throw new Error(msg);
        }
    }
    static differentOrError(valueA, valueB, msg) {
        try {
            this.equalsOrError(valueA, valueB, msg);
        }
        catch (msg) {
            return;
        }
        throw new Error(msg);
    }
    static validPriceOrError(price, msg) {
        if (price < 0)
            throw new Error(msg);
    }
    static validEmailOrError(email, msg) {
        const regexValidation = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi);
        if (!regexValidation.test(email))
            throw new Error(msg);
    }
}
exports.Validation = Validation;
