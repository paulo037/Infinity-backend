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
import nodemailer from 'nodemailer'
import fs from 'fs'
import { Mailer } from "./application/config/nodemailer";

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


router.post('/refreshToken', auth.refreshToken)



router.route('/user')
    .all(passport.authenticate)
    .get(userController.getUser)
    .put(userController.update)


router.route('/password')
    .put(passport.authenticate)
    .put(userController.updatePassword)
    .post(userController.passwordRecovery)



router.route('/password/:id')
    .get(userController.passwordRecoveryExist)
    .post(userController.UpdatePassword)

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

router.route('/product/category/:name')
    .get(productController.getProductByCategoryName)

router.route('/product/search/:term')
    .get(productController.search)


router.route('/size/:id')
    .all(passport.authenticate)
    .delete(admin(sizeController.deleteSize))


router.route('/size')
    .all(passport.authenticate)
    .get(admin(sizeController.getAll))
    .post(admin(sizeController.createNewSize))
    .put(admin(sizeController.updateSize))


router.route('/color/:id')
    .all(passport.authenticate)
    .delete(admin(colorController.deleteColor))

router.route('/color')
    .all(passport.authenticate)
    .get(admin((colorController.getAll)))
    .post(admin(colorController.createNewColor))
    .put(admin(colorController.updateColor))

router.route('/category')
    .put(passport.authenticate)
    .post(passport.authenticate)
    .get(categoryController.getAll)
    .post(admin(multer(multerConfig).single('file')), uploadImage, categoryController.createNewCategory)
    .put(admin(multer(multerConfig).single('file')), uploadImage, categoryController.updateCategory)

router.route('/category/:id')
    .all(passport.authenticate)
    .delete(admin(categoryController.deleteCategory))

router.route('/orders')
    .all(passport.authenticate)
    .get(admin(orderController.getAll))

router.route('/order')
    .all(passport.authenticate)
    .get((orderController.getbyUserId))

router.route('/order/rating/:id')
    .all(passport.authenticate)
    .put(orderController.updateRating)

router.route('/order/:id')
    .all(passport.authenticate)
    .get(orderController.getbyId)
    .put(admin(orderController.update))
    .delete(admin(orderController.delete))

router.route('/cart')
    .all(passport.authenticate)
    .post(cartController.postCart)
    .delete(cartController.deleteCart)
    .put(cartController.updateCart)
    .get(cartController.getCart)

router.route('/cart/products-number')
    .all(passport.authenticate)
    .get(cartController.getNumberofProducts)




router.route('/addresses')
    .all(passport.authenticate)
    .get(userController.getAddresses)

router.route('/address/:id')
    .all(passport.authenticate)
    .post(userController.createAddress)
    .put(userController.updateAddress)
    .get(userController.getAddress)


router.route('/preference')
    .all(passport.authenticate)
    .post(orderController.newOrder)


router.post('/webhooks/payment', orderController.webhook)

router.get('/address/cep/:cep', async (request: Request, response: Response) => {
    const cep = request.params.cep

    try {
        const resp = await axios.get(`http://viacep.com.br/ws/${cep}/json/`)
        if (resp.data.erro) {
            return response.status(400).send(`Não foi possível encontrar o cep: ${cep}`)

        }
        return response.json(resp.data).status(200)
    } catch (error) {
        return response.status(400).send(`Não foi possível encontrar o cep: ${cep}`)

    }
})




export default router;

