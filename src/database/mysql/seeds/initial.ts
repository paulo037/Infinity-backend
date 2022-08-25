import { Knex } from "knex";

import bcrypt from "bcrypt"

export async function seed(knex: Knex): Promise<void> {

    const salt = bcrypt.genSaltSync(10)


    await knex("user").insert([
        {
            id: 1,
            first_name: "paulo",
            last_name: "silva",
            image: "ww.exemple",
            password: bcrypt.hashSync("07182500", salt),
            email: "paulo@gmail.com",
            admin: true,
            cpf: "1231231233"
        },

        {
            id: 2,
            first_name: "ingred",
            last_name: "almeida",
            image: "ww.exemple",
            password: bcrypt.hashSync("12345678", salt),
            email: "ingred@gmail.com",
            admin: false,
            cpf: "1231231555"
        },

    ]);

    await knex("address").insert([
        {
            name: 'Casa',
            cep: '35695000',
            estate: 'Minas Gerais',
            city: 'Igaratinga',
            district: 'Centro',
            street: 'Sitio',
            telephone: '998713736',
            number: 1,
            user_id: 1,
        },
        {
            name: 'Casa',
            cep: '35695000',
            estate: 'Minas Gerais',
            city: 'Igaratinga',
            district: 'Centro',
            street: 'Sitio',
            telephone: '998713736',
            number: 22,
            user_id: 1,
        },

        {
            name: 'Casa',
            cep: '35695000',
            estate: 'Minas Gerais',
            city: 'Igaratinga',
            district: 'Centro',
            street: 'Sitio',
            telephone: '998713736',
            number: 2,
            user_id: 2,
        },

    ]);





    await knex("product").insert([
        {
            name: "Bulsa Flamengo",
            description: "Blusa de time do flamengo",
            price: 120,
            height: 2,
            width: 2,
            length: 2,
            id: 1,
        },

        {
            name: "Bulsa Social",
            description: "Blusa de Social",
            price: 220,
            height: 2,
            width: 2,
            length: 2,
            id: 2,
        },

    ]);

    await knex("category").insert([
        {
            name: "Blusa",
            image: "https://a-static.mlcdn.com.br/618x463/camiseta-masculina-basica-lisa-100-algodao-fio-30-1-cor-preta-tamanho-m-ritual-surf/ritualsurfstore/3ba9043af7bc11ea81aa4201ac18502e/5700a151a4ee615cafb10e2cf637708c.jpg",
            id: 1,
        },
        {
            name: "Blusa de Time",
            image: "https://static.netshoes.com.br/produtos/camisa-selecao-brasil-iii-1920-sn-torcedor-nike-masculina/14/HZM-0866-014/HZM-0866-014_zoom1.jpg?ts=1639673308",
            id: 2,
        },
        {
            name: "Blusa Social",
            image: "https://static.zattini.com.br/produtos/blusa-broken-rules-malha-listrada-masculina/06/E60-0565-006/E60-0565-006_zoom1.jpg?ts=1602703157&ims=544x",
            id: 3,
        },

    ]);

    await knex("product_has_category").insert([
        {
            category_id: 1,
            product_id: 1,
        },
        {
            category_id: 1,
            product_id: 2,
        },
        {
            category_id: 2,
            product_id: 1,
        },
        {
            category_id: 3,
            product_id: 2,
        },

    ]);

    await knex("size").insert([
        {
            value: 'P',
            id: 1,
        },
        {
            value: 'M',
            id: 2,
        },
        {
            value: 'G',
            id: 3,
        },
        {
            value: 'GG',
            id: 4,
        }

    ]);

    await knex("color").insert([
        {
            value: 'Branco',
            id: 1,
        },
        {
            value: 'Rosa',
            id: 2,
        },
        {
            value: 'Preto',
            id: 3,
        },
        {
            value: 'Amarela',
            id: 4,
        }

    ]);

    await knex("product_has_color").insert([
        {
            size_id: 3,
            color_id: 4,
            product_id: 1,
            quantity: 2,
        },
        {
            size_id: 1,
            color_id: 2,
            product_id: 1,
            quantity: 1,
        },
        {
            size_id: 2,
            color_id: 1,
            product_id: 1,
            quantity: 10,
        },
        {
            size_id: 1,
            color_id: 1,
            product_id: 2,
            quantity: 1,
        },
        {
            size_id: 3,
            color_id: 3,
            product_id: 2,
            quantity: 10,
        },
        {
            size_id: 1,
            color_id: 3,
            product_id: 2,
            quantity: 1,
        },

    ]);

    await knex("image").insert([
        {
            url: "https://static.netshoes.com.br/produtos/camisa-flamengo-i-2021-sn-torcedor-adidas-masculina/02/NQQ-1178-002/NQQ-1178-002_zoom1.jpg?ts=1599854677&ims=544x",
            name: "Frente",
            key: "f.d",
            primary: true,
            product_id: 1,
        },
        {
            url: "https://static.netshoes.com.br/produtos/camisa-flamengo-i-2021-sn-torcedor-adidas-masculina/02/NQQ-1178-002/NQQ-1178-002_zoom2.jpg?ts=1599854677&?ims=1088x",
            name: "Atrás",
            key: "f2.d",
            primary: false,
            product_id: 1,
        },
        {
            url: "https://a-static.mlcdn.com.br/618x463/camisa-social-ml-slim-masculina-tam-3-alfaiataria/lotustrajes/0193f6ce302311eca2074201ac185049/8fa1100a833e11d9b9f0852f59f0b2d8.jpg",
            name: "Frente",
            key: "f55.d",
            primary: true,
            product_id: 2,
        },


    ]);

    await knex("order").insert([
        {   
            id: 1,
            price: 440,
            status: 5,
            name_address: 'casa',
            cep: '35695000',
            estate: 'Minas Gerais',
            city: 'Igaratinga',
            district: 'Centro',
            street: 'Sitio',
            telephone: '998713736',
            number_address: 22,
            user_id: 1,
        },
        {
            id: 2,
            price: 120,
            status: 5,
            name_address: 'casa',
            cep: '35695000',
            estate: 'Minas Gerais',
            city: 'Igaratinga',
            district: 'Centro',
            street: 'Sitio',
            telephone: '998713736',
            number_address: 22,
            user_id: 1,
        },


    ]);

    await knex("order_has_product").insert([
        {

            order_id: 1,

            product_id: 1,

            color:'Branco',

            size: 'G',

            rating: 4.6,

            quantity: 2,
            product_name: 'blusa flamengo',

        },
        {

            order_id: 1,

            product_id: 2,

            color:'Branco',

            size: 'G',

            rating: 4.6,

            quantity: 1,
            product_name: 'blusa social',

        },

        {

            order_id: 1,

            product_id: 1,

            color:'Branco',

            size: 'M',

            rating: 3,

            quantity: 1,
            product_name: 'blusa flamengo',

        },


    ]);








};
