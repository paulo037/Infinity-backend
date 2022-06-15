import express, { request, response } from "express";
import { ProductController } from "./database/mysql/controllers/product-controller";
import SizeController from "./database/mysql/controllers/size-controller";
import { multerConfig } from "./application/config/multer";
import { uploadImage } from "./database/firebase/firebase";
import { CategoryController } from "./database/mysql/controllers/category-controller";
import { UserController } from "./database/mysql/controllers/user-controller";
import { ColorController } from "./database/mysql/controllers/color-controller";
import { OrderController } from "./database/mysql/controllers/order-controller";


const router = express.Router()
const userController = new UserController()
const productController = new ProductController()
const sizeController = new SizeController()
const colorController = new ColorController()
const categoryController = new CategoryController()
const orderController = new OrderController()

const multer = require("multer")



router.route('/user')
    .get(userController.getAll)

router.route('/admin/user/:id')
    .put(userController.changeAdminPermission)

router.route('/search/')
        .get(productController.autoComplete)

router.route("/product/image")
    .post(multer(multerConfig).array('uploadImages', 10), uploadImage, productController.uploadImage);


router.route('/product/:id')
    .get(productController.getProductById)
    .put(productController.updateProduct)
    .delete(productController.delete);

router.route('/product')
    .post(productController.createProduct)
    .get(productController.getAll)

router.route('/product/category/:id')
    .get(productController.getProductByCategoryId)

router.route('/product/search/:term')
    .get(productController.search)


router.route('/size')
    .get(sizeController.getAll)

router.route('/color')
    .get(colorController.getAll)

router.route('/category')
    .get(categoryController.getAll)

router.route('/order')
    .get(orderController.getAll)


export default router;