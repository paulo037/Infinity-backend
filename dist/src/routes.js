"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./database/mysql/controllers/product-controller");
const size_controller_1 = __importDefault(require("./database/mysql/controllers/size-controller"));
const multer_1 = require("./application/config/multer");
const firebase_1 = require("./database/firebase/firebase");
const category_controller_1 = require("./database/mysql/controllers/category-controller");
const user_controller_1 = require("./database/mysql/controllers/user-controller");
const color_controller_1 = require("./database/mysql/controllers/color-controller");
const order_controller_1 = require("./database/mysql/controllers/order-controller");
const router = express_1.default.Router();
const userController = new user_controller_1.UserController();
const productController = new product_controller_1.ProductController();
const sizeController = new size_controller_1.default();
const colorController = new color_controller_1.ColorController();
const categoryController = new category_controller_1.CategoryController();
const orderController = new order_controller_1.OrderController();
const multer = require("multer");
router.route('/user')
    .get(userController.getAll);
router.route('/admin/user/:id')
    .put(userController.changeAdminPermission);
router.route('/search/')
    .get(productController.autoComplete);
router.route("/product/image")
    .post(multer(multer_1.multerConfig).array('uploadImages', 10), firebase_1.uploadImage, productController.uploadImage);
router.route('/product/:id')
    .get(productController.getProductById)
    .put(productController.updateProduct)
    .delete(productController.delete);
router.route('/product')
    .post(productController.createProduct)
    .get(productController.getAll);
router.route('/product/category/:id')
    .get(productController.getProductByCategoryId);
router.route('/product/search/:term')
    .get(productController.search);
router.route('/size')
    .get(sizeController.getAll);
router.route('/color')
    .get(colorController.getAll);
router.route('/category')
    .get(categoryController.getAll);
router.route('/order')
    .get(orderController.getAll);
exports.default = router;
