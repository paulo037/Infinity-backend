import { CartRepositoryMysql } from "../../../database/mysql/model/cart-repository";
import { OrderRepositoryMsql } from "../../../database/mysql/model/order-repository";
import { ProductRepositoryMsql } from "../../../database/mysql/model/product-repository";
import { PromotionRepositoryMsql } from "../../../database/mysql/model/promotion-repository";
import { UserRepositoryMysql } from "../../../database/mysql/model/user-repository";
import { AddressProps } from "../../../domain/entities/user/address";
import { CreateItemPreference } from "../order/create-item-preference";
import { CreateOrder, OrderItem } from "../order/create-order";
import { CreateOrderHasProduct } from "../order/create-order-has-product";
import { CreatePreference } from "../order/create-preference";
import { CreateAddress } from "../user/create-address";



describe('Create order request', () => {



    it('should be able to create order-request with disccount', async () => {
        const repository = new OrderRepositoryMsql();
        const cartRepository = new CartRepositoryMysql();
        const userRepository = new UserRepositoryMysql();
        const productRepository = new ProductRepositoryMsql();
        const promotionsRepository = new PromotionRepositoryMsql();
        const createAddress = new CreateAddress(userRepository);
        const createOrder = new CreateOrder(repository, productRepository, promotionsRepository);
        const createPreference = new CreatePreference(userRepository);
        const createItemPreference = new CreateItemPreference(productRepository);
        const createOrderHasProduct = new CreateOrderHasProduct(productRepository)


        let products = [
            {

                "size_id": "0d14a7b1-7131-419b-8168-07d17938a3e5",
                "color_id": "17814c5b-321b-494c-bd46-122ca258bc60",
                "quantity": 1,
                "product_id": "094ec94d-5e98-4956-880f-1d886b4d636c",
             
            },
            // {
            //     "size_id": "3d954c0c-9ac4-47d1-93b4-ce673cc90d10",
            //     "quantity": 2,
            //     "color_id": "17814c5b-321b-494c-bd46-122ca258bc60",
            //     "product_id": "651973d6-89ab-484f-9fe4-fb584de055c3",
               
            // }
        ] as unknown as OrderItem[]
        const order_id = await createOrder.execute({ items: products, address: undefined as unknown as AddressProps })
        console.log(order_id)
        expect(false).toBeFalsy();
    });





})