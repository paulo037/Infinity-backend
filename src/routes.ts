import express, { request, response } from "express";
import { ProductController } from "./database/mysql/constrollers/product-controller";
import SizeController from "./database/mysql/constrollers/size-controller";
import UserController from "./database/mysql/constrollers/user-controller";
import { multerConfig } from "./application/config/multer";
import { uploadImage } from "./database/firebase/firebase";

const router = express.Router()
const userController = new UserController()
const productController = new ProductController()
const sizeController = new SizeController()

const multer = require("multer")

console.log(__dirname + "\\application\\tmp\\uploads")

router.route('/user')
    .get(async (request, response) => {
        const user = await userController.findById(1);
        console.log(user);
        response.json(user);
    })


router.route("/product/image")
    .post(multer(multerConfig).array('uploadImages', 10), uploadImage, productController.uploadImage);

router.route('/product/:id')
    .get(productController.getProductById)
    .put(productController.updateProduct);

router.route('/product')
    .post(productController.createProduct)
    .get(productController.getAll)
   

router.route('/size')
    .get(sizeController.getAll)



export default router;