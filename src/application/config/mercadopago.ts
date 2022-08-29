
const dot = require('dotenv')

dot.config()


// SDK do Mercado Pago
const mercadopago = require('mercadopago');
// Adicione as credenciais
mercadopago.configure({
    access_token:  process.env.ACCESS_TOKEN
});


export {mercadopago}