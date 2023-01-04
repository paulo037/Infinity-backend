import {Knex} from "knex";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt"
import { Status } from "../../../domain/entities/order/status";

export async function seed(knex: Knex): Promise<void> {

    const salt = bcrypt.genSaltSync(10)

    const id1 = uuidv4();
    const id2 = uuidv4();


    const p1 = uuidv4();
    const p2 = uuidv4();

    const c1 = uuidv4();
    const c2 = uuidv4();
    const c3 = uuidv4();

    const s1 = uuidv4();
    const s2 = uuidv4();
    const s3 = uuidv4();
    const s4 = uuidv4();

    const co1 = uuidv4();
    const co2 = uuidv4();
    const co3 = uuidv4();
    const co4 = uuidv4();


    const o1 = uuidv4();
    const o2 = uuidv4();
    const o3 = uuidv4();
    const o4 = uuidv4();

    const i1 = uuidv4();
    const i2 = uuidv4();
    const i3 = uuidv4();
    const i4 = uuidv4();

    await knex("user").insert([
        {

            id: id1,
            first_name: "paulo",
            last_name: "silva",
            password: bcrypt.hashSync("07182500", salt),
            email: "paulo07182500@gmail.com",
            admin: true,
            cpf: "13210829675"
        },

        {
            id: id2,
            first_name: "ingred",
            last_name: "almeida",
            password: bcrypt.hashSync("12345678", salt),
            email: "ingred@gmail.com",
            admin: false,
            cpf: "12345678901"
        },

    ]);

    await knex("address").insert([
        {
            user_name: 'Paulo Henrique',
            cep: '35695000',
            state: 'MG',
            city: 'Igaratinga',
            district: 'Centro',
            street: 'Sitio',
            telephone: '998713736',
            complement: "complemento",
            number: 1,
            user_id: id1,
            id: uuidv4(),
        },
        {
            user_name: 'Paulo Henrique',
            cep: '35695000',
            state: 'MG',
            city: 'Igaratinga',
            district: 'Centro',
            street: 'Sitio',
            telephone: '998713736',
            complement: "complemento",
            number: 22,
            user_id: id1,
            id: uuidv4(),
        },

        {
            user_name: 'Ingred Almeida',
            cep: '35695000',
            state: 'Minas Gerais',
            city: 'Igaratinga',
            district: 'Centro',
            street: 'Sitio',
            telephone: '998713736',
            complement: "complemento",
            number: 2,
            user_id: id2,
            id: uuidv4(),
        },

    ]);


    await knex("product").insert([
        {
            name: "Blusa Flamengo",
            description: "Blusa de time do flamengo",
            price: 120,
            height: 2,
            width: 2,
            length: 2,
            id: p1,
        },

        {
            name: "Blusa Social",
            description: "Blusa de Social",
            price: 220,
            height: 2,
            width: 2,
            length: 2,
            id: p2,
        },

    ]);

    await knex("category").insert([
        {
            name: "Produtos Mais Vendidos",
            image: "https://a-static.mlcdn.com.br/618x463/camiseta-masculina-basica-lisa-100-algodao-fio-30-1-cor-preta-tamanho-m-ritual-surf/ritualsurfstore/3ba9043af7bc11ea81aa4201ac18502e/5700a151a4ee615cafb10e2cf637708c.jpg",
            id: c1,
        },
        {
            name: "Lançamentos",
            image: "https://static.netshoes.com.br/produtos/camisa-selecao-brasil-iii-1920-sn-torcedor-nike-masculina/14/HZM-0866-014/HZM-0866-014_zoom1.jpg?ts=1639673308",
            id: c2,
        },
        {
            name: "Blusa Social",
            image: "https://static.zattini.com.br/produtos/blusa-broken-rules-malha-listrada-masculina/06/E60-0565-006/E60-0565-006_zoom1.jpg?ts=1602703157&ims=544x",
            id: c3,
        },

    ]);

    await knex("product_has_category").insert([
        {
            category_id: c1,
            product_id: p1,
        },
        {
            category_id: c1,
            product_id: p2,
        },
        {
            category_id: c2,
            product_id: p1,
        },
        {
            category_id: c3,
            product_id: p2,
        },

    ]);

    await knex("size").insert([
        {
            value: 'P',
            id: s1,
        },
        {
            value: 'M',
            id: s2,
        },
        {
            value: 'G',
            id: s3,
        },
        {
            value: 'GG',
            id: s4,
        }

    ]);

    await knex("color").insert([
        {
            value: 'Branco',
            id: co1,
        },
        {
            value: 'Rosa',
            id: co2,
        },
        {
            value: 'Preto',
            id: co3,
        },
        {
            value: 'Amarela',
            id: co4,
        }

    ]);

    await knex("product_has_color").insert([
        {
            size_id: s3,
            color_id: co4,
            product_id: p1,
            quantity: 2,
        },
        {
            size_id: s1,
            color_id: co2,
            product_id: p1,
            quantity: 1,
        },
        {
            size_id: s2,
            color_id: co1,
            product_id: p1,
            quantity: 10,
        },
        {
            size_id: s1,
            color_id: co1,
            product_id: p2,
            quantity: 1,
        },
        {
            size_id: s3,
            color_id: co3,
            product_id: p2,
            quantity: 10,
        },
        {
            size_id: s1,
            color_id: co3,
            product_id: p2,
            quantity: 1,
        },

    ]);

    await knex("image").insert([
        {

            id: i1,
            url: "https://static.netshoes.com.br/produtos/camisa-flamengo-i-2021-sn-torcedor-adidas-masculina/02/NQQ-1178-002/NQQ-1178-002_zoom1.jpg?ts=1599854677&ims=544x",
            name: "Frente",
            key: "f.d",
            primary: true,
            product_id: p1,
        },
        {
            id: i2,
            url: "https://static.netshoes.com.br/produtos/camisa-flamengo-i-2021-sn-torcedor-adidas-masculina/02/NQQ-1178-002/NQQ-1178-002_zoom2.jpg?ts=1599854677&?ims=1088x",
            name: "Atrás",
            key: "f2.d",
            primary: false,
            product_id: p1,
        },
        {
            id: i3,
            url: "https://a-static.mlcdn.com.br/618x463/camisa-social-ml-slim-masculina-tam-3-alfaiataria/lotustrajes/0193f6ce302311eca2074201ac185049/8fa1100a833e11d9b9f0852f59f0b2d8.jpg",
            name: "Frente",
            key: "f55.d",
            primary: true,
            product_id: p2,
        },


    ]);

    await knex("order").insert([
        {
            id: o1,
            price: 440,
            status: Status.PAYMENT_PENDING,
            user_name: 'casa',
            cep: '35695000',
            state: 'Minas Gerais',
            city: 'Igaratinga',
            district: 'Centro',
            street: 'Sitio',
            telephone: '998713736',
            number: 22,
            user_id: id1,
        },
        {
            id: o2,
            price: 120,
            status: Status.PAYMENT_APPROVED,
            user_name: 'casa',
            cep: '35695000',
            state: 'Minas Gerais',
            city: 'Igaratinga',
            district: 'Centro',
            street: 'Sitio',
            telephone: '998713736',
            number: 22,
            user_id: id1,
        },

        {
            id: "ndjbdfkjfbskjf",
            price: 120,
            status: Status.PAYMENT_REFUSED,
            user_name: 'casa',
            cep: '35695000',
            state: 'Minas Gerais',
            city: 'Igaratinga',
            district: 'Centro',
            street: 'Sitio',
            telephone: '998713736',
            number: 22,
            user_id: id1,
        },


    ]);

    await knex("order_has_product").insert([
        {

            id: uuidv4(),

            order_id: o2,

            product_price: 50,

            product_id: p1,

            color: 'Branco',

            size: 'G',

            rating: 4.6,

            quantity: 2,

            product_name: 'blusa flamengo',

        },
        {

            id: uuidv4(),

            order_id: o1,

            product_id: p2,

            product_price: 50,

            color: 'Branco',

            size: 'G',

            rating: 4.6,

            quantity: 1,

            product_name: 'blusa social',

        },

        {
            id: uuidv4(),

            order_id: "ndjbdfkjfbskjf",

            product_id: p1,

            product_price: 50,

            color: 'Branco',

            size: 'M',

            rating: 3,

            quantity: 1,

            product_name: 'blusa flamengo',

        },

        {
            id: uuidv4(),

            order_id: "ndjbdfkjfbskjf",

            product_id: p1,

            product_price: 50,

            color: 'Branco',

            size: 'M',

            rating: 3,

            quantity: 1,

            product_name: 'blusa flamengo',

        },  


    ]);








};
