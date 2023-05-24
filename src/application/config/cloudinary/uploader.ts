import { randomBytes } from "crypto";
import { NextFunction, Request, Response } from "express";
import cloudinary from './config'
import sharp from "sharp";
import { Image } from "../../../domain/entities/product/image";
import { Product, ProductProps } from "../../../domain/entities/product/product";


const updateImage = async (image: Express.Multer.File) =>
    new Promise<cloudinary.UploadApiResponse>(async (resolve, reject) => {


        try {

            image.buffer = await sharp(image.buffer).toFormat('png').resize(1200, 1200, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).toBuffer();

            const buf = randomBytes(16);
            const nomeArquivo = `${buf.toString('hex')}-${image.originalname.split('.')[0]}`.replace(/[^\w ]/g, '').replace(/ /g, '_')

            const uploaderResponse = await cloudinary.v2.uploader.upload(`data:image/png;base64,${image.buffer.toString('base64')}`, {
                public_id: nomeArquivo,
                folder: 'infinity/product',

            });

            resolve({ ...uploaderResponse, provider: "cloudinary" });

        } catch (error) {
            reject(error)
        }

    });


export const deleteImage = async (public_id: string) => {

    await cloudinary.v2.uploader.destroy(public_id).catch(() => {
        throw new Error("Não foi possível apagar a imagem");
    })


}


export const uploadImage = async (request: Request, response: Response, next: NextFunction) => {
    try {

        if (!request.files && !request.file) {
            response.locals.createImages = [];
            return next()
        }

        const productProps: ProductProps = JSON.parse(request.body.product)
        const product: Product = new Product(productProps)
        request.body.product = product;

        let createImages: Image[] = []
        
        let files = request.files ? request.files as unknown as Express.Multer.File[] : [request.file] as unknown as Express.Multer.File[];
        const primary = request.body.primary ? JSON.parse(request.body.primary) as Array<boolean> : [true] as Array<boolean> 

        if (0 === (files.length as unknown as number)) {
            response.locals.images = [];
            return next()
        }





        for (let index = 0; index < (files.length as unknown as number); index++) {
            await updateImage(files[index])
                .then(img => {
                    createImages.push(new Image({
                        url: img.public_id,
                        key: img.public_id,
                        provider: img.provider,
                        primary: primary[index],
                        name: files[index].originalname,
                        product_id: product.id
                    }))
                })
                .catch(err => console.error(err))
        };


        response.locals.createImages = createImages;

    } catch (error) {
         return next();
    }
    return next();

}