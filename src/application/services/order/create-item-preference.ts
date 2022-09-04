import { type } from "os";
import { Address } from "../../../domain/entities/user/address";
import { ProductRepository } from "../../repositories/ProductRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { GetProductById } from "../product/get-product-by-id";
import { FindUserByEmail } from "../user/find-user-by-email ";

const dotenv = require('dotenv')
dotenv.config()


export type CreateItemPreferenceRequest = {
    product_id: string,
    quantity: number,

}



type ItemPreferenceProps = {
    id: string;
    title: string;
    currency_id: string;
    picture_url?: string;
    description: string;
    quantity: number;
    unit_price: number;
}


export class ItemPreference {
    id: string;
    title: string;
    currency_id: string;
    picture_url?: string;
    description: string;
    quantity: number;
    unit_price: number;




    public constructor(props: ItemPreferenceProps) {
        this.id = props.id;
        this.title = props.title
        this.currency_id = props.currency_id
        this.picture_url = props.picture_url
        this.description = props.description
        this.quantity = props.quantity
        this.unit_price = props.unit_price
    }


}


export class CreateItemPreference {




    constructor(
        private productRepository: ProductRepository,
        private findProductById = new GetProductById(productRepository)
    ) { }



    async create(props: CreateItemPreferenceRequest) {

        const product = await this.findProductById.execute(props.product_id) as any
        const currence = "BRL"
        const itemPreferenceProps = {
            id: props.product_id,
            quantity: props.quantity,
            title: product.name,
            currency_id: currence,
            picture_url: product.images[0].url,
            description: product.name,
            unit_price: parseFloat(product.price),
        }

        const itemPreference = new ItemPreference(itemPreferenceProps)

        return itemPreference;

    }


}