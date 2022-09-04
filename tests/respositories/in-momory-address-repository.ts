import { AddressRepository } from "../../src/application/repositories/AddressRepository";
import { Address } from "../../src/domain/entities/user/address";

export class InMemoryAddressRepository implements AddressRepository{
   
    public items: Address[] = []


    async create(address: Address): Promise<null> {
        this.items.push(address);
        return null;
    }

    async update(address: Address): Promise<null> {
        this.items.forEach((p, index) => {
            if(p.props.id === address.props.id)this.items[index] = address;
        });
        return null
    }

    async delete(id: string): Promise<null> {
        let address;

        this.items.forEach(element => {
            if (element.props.id === id) {
                address = this.items.splice(this.items.indexOf(element), 1)
            }

        });

        if (address) return null;

        throw new Error("produto não encontrado");

    }
    

    async findByUserId(user_id: string): Promise<Address[] | null> {
        let addresses: Address[] = []

        this.items.map(address => {
            if (address.props.user_id === user_id) addresses.push(address);
        });

        return addresses;
    }

}