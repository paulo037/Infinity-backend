import { Entity } from "../../../core/domain/entities";

type SaleProps = {
    price: string;
    estate:string;
    date: Date;
    address_id: number;
    status: number;
    user_id :number;
}
class Sale extends Entity<SaleProps>{
    private constructor(props: SaleProps) {
        super(props);
    }


    static create(props: SaleProps){
        const sale = new Sale(props)

        return sale;
    }
}