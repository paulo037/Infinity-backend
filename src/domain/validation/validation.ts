
export class Validation {

    static existOrError(value: any, msg: string) {
        if (!value) throw new Error(msg)
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

    static equalsOrError(valueA: any, valueB: any, msg: string) {

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

    static validEmailOrError(email: string, msg: string){
        const regexValidation = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi);
        if(!regexValidation.test(email))  throw new Error(msg)
    }


    
}

