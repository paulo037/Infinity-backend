
export class Validation {

    static existOrError(value: any, msg: string) {
        if (typeof value !== 'boolean' && !value) throw new Error(msg)
        if (value == null) throw new Error(msg)
        if (Array.isArray(value) && value.length === 0) throw new Error(msg)
        if (typeof value === 'string' && !value.trim()) throw new Error(msg)
    }

    static notExistOrError(value: any, msg: string) {
        try {
            this.existOrError(value, msg)
        } catch (msg) {
            return
        }
        throw new Error(msg) 
    }

    static equalsOrError(valueA: any, valueB: any, msg?: string) {

        if (typeof valueA === 'object' && typeof valueB === 'object') {
            let akeys = Object.keys(valueA)
            let bkeys = Object.keys(valueB)

            if (akeys.length != bkeys.length) {
                throw new Error(msg)
            }

            let different = akeys.some((chave) => {
                return valueA[chave] !== valueB[chave];
            });

            if (different) throw new Error(msg)
        } else {
            if (valueA != valueB) throw new Error(msg)
        }

    }

    static differentOrError(valueA: any, valueB: any, msg: string) {
        try {

            this.equalsOrError(valueA, valueB, msg)
        } catch (msg) {
            return
        }

        throw new Error(msg)
    }

    static validPriceOrError(price: number, msg: string){
        if(price < 0)  throw new Error(msg)
           
    }

    static validPositiveOrError(price: number, msg: string){
        if(price < 1)  throw new Error(msg)
           
    }

    static validEmailOrError(email: string, msg: string){
        const regexValidation = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi);
        if(!regexValidation.test(email))  throw new Error(msg)
    }


    static validCPFOrError(cpf: string){
        
        let Soma;
        let valido = true;
        let Resto;
        Soma = 0;
        if (cpf == "00000000000") valido = false;

        for (let i = 1; i <= 9; i++) {
            Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        Resto = (Soma * 10) % 11;

        if (Resto == 10 || Resto == 11) Resto = 0;
        if (Resto != parseInt(cpf.substring(9, 10))) valido = false;

        Soma = 0;
        for (let i = 1; i <= 10; i++) {
            Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        Resto = (Soma * 10) % 11;

        if (Resto == 10 || Resto == 11) Resto = 0;
        if (Resto != parseInt(cpf.substring(10, 11))) valido = false;

        if (!valido) {
            throw new Error("CPF inválido")
        }

    }


    
}

