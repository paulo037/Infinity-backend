"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    await knex("user").insert([
        { user_id: 1,
            name: "paulo",
            image: "ww.exemple",
            password: "11225221",
            email: "paulo@gmail.com",
            admin: true,
            cpf: "1231231233" },
    ]);
}
exports.seed = seed;
;
