import  express, { response }  from "express";
import ProductController from "./database/constrollers/product-controller";
import UserController from "./database/constrollers/user-controller";

const router = express.Router()

const userController = new UserController()
const productController = new ProductController()




// const multer = require("multer")


router.route('/user')
    .get(async(request, response)=>{
        const user = await userController.findById(1);
        console.log(user);
        response.json(user);
    })


// app.route('/user/:id')
//     .put(app.api.user.save)
//     .get(app.api.user.getById)

// app.route('/address')
//     .post(app.api.address.save)


// app.route('/address/:id')
//     .put(app.api.address.save)
//     .get(app.api.address.getByUserId)
//     .delete(app.api.address.deleteAddress)

// app.route('/size')
//     .get(app.api.size.get)
//     .post(app.api.size.save)

// app.route('/size/:id')
//     .put(app.api.size.save)
//     .get(app.api.size.getById)
//     .delete(app.api.size.deleteSize)

router.route('/product')
    .get(async (request, response)=>{
        const products = await productController.getByCategory(request.body.id);
        response.json(products);
    })


    // .post(app.api.product.save)

// app.route('/product/category')
//     .get(app.api.product.getProductByCategory)

// app.route('/product/:id')
//     .put(app.api.product.save)
//     .get(app.api.product.getById)
//     .delete(app.api.product.deleteProduct)


// app.route('/category')
//     .get(app.api.category.get)
//     .post(app.api.category.save)

// app.route('/category/:id')
//     .put(app.api.category.save)
//     .get(app.api.category.getById)
//     .delete(app.api.category.deleteCategory)

// app.route("/image")
//     .post(multer(app.config.multer).single("file"), app.config.firebase.uploadImage)


export default  router;