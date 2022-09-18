import express, { Request, Response } from "express";
import { ProductController } from "./database/mysql/controllers/product-controller";
import SizeController from "./database/mysql/controllers/size-controller";
import { multerConfig } from "./application/config/multer";
import { uploadImage } from "./database/firebase/firebase";
import { CategoryController } from "./database/mysql/controllers/category-controller";
import { UserController } from "./database/mysql/controllers/user-controller";
import { ColorController } from "./database/mysql/controllers/color-controller";
import { OrderController } from "./database/mysql/controllers/order-controller";
import { Auth } from "./application/config/auth";
import { Passport } from "./application/config/passport";
import admin from "./application/config/admin";
import { CartController } from "./database/mysql/controllers/cart-controller";
import axios from "axios";

const router = express.Router()
const userController = new UserController()
const productController = new ProductController()
const sizeController = new SizeController()
const colorController = new ColorController()
const categoryController = new CategoryController()
const orderController = new OrderController()
const cartController = new CartController()
const auth = new Auth()
const passport = new Passport()

const multer = require("multer")


router.post('/signin', auth.signin)

router.post('/signup', userController.create)

router.get('/admin', passport.authenticate, admin(auth.admin))

router.post('/validateToken', passport.authenticate, auth.validateToken)


router.post('/refreshToken', passport.authenticate, auth.refreshToken)

router.route('/user')
    .get(passport.authenticate)
    .put(passport.authenticate)
    .get(userController.getUser)
    .put(userController.update)

router.route('/users')
    .get(passport.authenticate, admin(userController.getAll))


router.route('/admin/user/:id')
    .all(passport.authenticate)
    .put(admin(userController.changeAdminPermission))

router.route('/search/')
    .get(productController.autoComplete)

router.route("/product/image")
    .all(passport.authenticate)
    .post(admin(multer(multerConfig).array('uploadImages', 10)), uploadImage, productController.uploadImage);


router.route('/product/:id')
    .put(passport.authenticate, admin(productController.updateProduct))
    .delete(passport.authenticate, admin(productController.delete))
    .get(productController.getProductById)


router.route('/product-id/:name')
    .get(productController.getProductByName)

router.route('/product')
    .all(passport.authenticate)
    .post(admin(productController.createProduct))
    .get(admin(productController.getAll));

router.route('/product/category/:id')
    .get(productController.getProductByCategoryId)

router.route('/product/search/:term')
    .get(productController.search)


router.route('/size')
    .all(passport.authenticate)
    .get(admin(sizeController.getAll))

router.route('/color')
    .all(passport.authenticate)
    .get(admin((colorController.getAll)))

router.route('/category')
    .get(categoryController.getAll)

router.route('/order')
    .all(passport.authenticate)
    .get(admin(orderController.getAll))

router.route('/cart')
    .all(passport.authenticate)
    .post(cartController.postCart)
    .delete(cartController.deleteCart)
    .put(cartController.updateCart)

router.route('/cart/products-number')
    .all(passport.authenticate)
    .get(cartController.getNumberofProducts)

router.route('/cart/:id')
    .all(passport.authenticate)
    .get(cartController.getCart)


router.route('/address')
    .all(passport.authenticate)
    .get(userController.getAdresses)


router.route('/preference')
    .all(passport.authenticate)
    .post(orderController.newOrder)


router.post('/webhooks/payment', orderController.webhook)

router.get('/address/cep/:cep', async (request: Request, response: Response) => {
    const cep = request.params.cep

    try {
        const resp = await axios.get(`http://viacep.com.br/ws/${cep}/json/`)
        if (resp.data.erro) {
            response.status(400).send(`Não foi possível encontrar o cep: ${cep}`)

        }
        response.json(resp.data).status(200)
    } catch (error) {
        response.status(400).send(`Não foi possível encontrar o cep: ${cep}`)

    }
})
export default router;