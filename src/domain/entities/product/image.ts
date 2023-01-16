import { v4 } from "uuid";

type ImageProps = {
    url: string;
    name: string;
    key: string;
    primary: boolean;
    product_id: string;
    id?: string;
    provider?: string;
}

export class Image {

    public url: string;
    public name: string;
    public key: string;
    public primary: boolean;
    public id: string;
    public provider: string;
    public product_id: string;

    constructor(
        {
            url,
            name,
            key,
            primary,
            id,
            provider,
            product_id }: ImageProps
    ) {
        this.url = url
        this.name = name
        this.key = key
        this.primary = primary
        this.id = id ?? v4()
        this.provider = provider ?? 'static'
        this.product_id = product_id
    }


}