import { Entity } from "../../../core/domain/entities";

type ImageProps = {
    url: string;
    name:string;
    key:string;
    primary: boolean;
    
}
export class Image extends Entity<ImageProps>{
    private constructor(props: ImageProps) {
        super(props);
    }


    static create(props: ImageProps){
        const image = new Image(props)
        
        return image;
    }
}