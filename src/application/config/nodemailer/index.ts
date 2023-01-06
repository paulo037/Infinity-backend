import nodemailer from 'nodemailer'
import fs from 'fs'


export type SendPasswordRecoveryRequest = {
    first_name: string;
    id: string;
    to: string
}



export type SendWelcomeRequest = {
    first_name: string;
    to: string
}


export type SendOrderStatusApprovedRequest = {
    first_name: string;
    to: string;
}

export type SendOrderStatusRefusedRequest = {
    first_name: string;
    to: string;
}

export type SendOrderStatusSentRequest = {
    first_name: string;
    to: string;
    tracking_code: string;
}

export type SendNewOrder = {
    id: string;
    price: number;
    city: string;
    state: string;
}

const host = process.env.NODEMAILER_HOST as string
const port = parseInt(process.env.NODEMAILER_PORT as string)
const service = process.env.NODEMAILER_SERVICE as string
const user = process.env.NODEMAILER_USER as string
const pass = process.env.NODEMAILER_PASS as string

const transport = nodemailer.createTransport({
    host,
    port,
    service,
    secure: false,
    auth: {
        user,
        pass,
    },
    tls: {
        rejectUnauthorized: false
    }
})




export class Mailer {

    constructor(
    ) { }



    public static passwordRecovery = async ({ first_name, id, to }: SendPasswordRecoveryRequest) => {
        let html = fs.readFileSync(__dirname + '/password_recovery.html', 'utf8')

        const link = `${process.env.BASE_FRONT}/recovery/${id}`;

        html = html.replace('{first_name}', first_name)
        html = html.replace('{link}', link)

        await transport.sendMail({
            from: `Infinity Modas <${user}>`,
            to,
            subject: "Recuperação de senha",
            html: html
        }).catch(() => {
            throw new Error("Não foi possível enviar o email de recuperação de senha!")
        })
    }

    public static welcome = async ({ first_name, to }: SendWelcomeRequest) => {
        let html = fs.readFileSync(__dirname + '/welcome.html', 'utf8')

        const link = `${process.env.BASE_FRONT}`;

        html = html.replace('{first_name}', first_name)
        html = html.replace('{link}', link)

        await transport.sendMail({
            from: `Infinity Modas <${user}>`,
            to,
            subject: "Bem-vindo(a) à Infinity Modas",
            html: html
        }).catch(() => {
            throw new Error("Não foi possível enviar o email de boas-vindas!")
        })
    }

    public static orderStatusApproved = async ({ first_name, to }: SendOrderStatusApprovedRequest) => {
        let html = fs.readFileSync(__dirname + '/status_approved.html', 'utf8')

        const link = `${process.env.BASE_FRONT}/profile/order`;

        html = html.replace('{first_name}', first_name)
        html = html.replace('{link}', link)

        await transport.sendMail({
            from: `Infinity Modas <${user}>`,
            to,
            subject: "Pagamento aprovado",
            html: html
        }).catch(() => {
            throw new Error("Não foi possível enviar o email de pagamento aprovado!")
        })
    }

    public static orderStatusRefused = async ({ first_name, to }: SendOrderStatusRefusedRequest) => {
        let html = fs.readFileSync(__dirname + '/status_refused.html', 'utf8')

        const link = `${process.env.BASE_FRONT}/profile/order`;

        html = html.replace('{first_name}', first_name)
        html = html.replace('{link}', link)

        await transport.sendMail({
            from: `Infinity Modas <${user}>`,
            to,
            subject: "Pagamento recusado",
            html: html
        }).catch(() => {
            throw new Error("Não foi possível enviar o email de pagamento recusado!")
        })
    }

    public static orderStatusSent = async ({ first_name, to, tracking_code }: SendOrderStatusSentRequest) => {
        let html = fs.readFileSync(__dirname + '/status_sent.html', 'utf8')

        const link = `${process.env.BASE_FRONT}/profile/order`;

        html = html.replace('{first_name}', first_name)
        html = html.replace('{link}', link)
        html = html.replace('{tracking_code}', tracking_code)

        await transport.sendMail({
            from: `Infinity Modas <${user}>`,
            to,
            subject: "Pedido enviado",
            html: html
        }).catch(() => {
            throw new Error("Não foi possível enviar o email de pagaento recusado!")
        })
    }

    public static newOrder = async ({ id, price, city, state }: SendNewOrder) => {
        let html = fs.readFileSync(__dirname + '/new_order.html', 'utf8')

        const to = process.env.EMAIL_ORDER;
        const link = `${process.env.BASE_FRONT}/admin/order/${id}`;
        const price_string = 'R$ ' + price.toFixed(2).toString().replace('.', ',');
        const location = `${city}, ${state}`
        html = html.replace('{link}', link);
        html = html.replace('{price}', price_string);
        html = html.replace('{location}', location);

        await transport.sendMail({
            from: `Infinity Modas <${user}>`,
            to,
            subject: "Novo pedido",
            html: html
        }).catch(() => {
            throw new Error("Não foi possível enviar o email de novo pedido!")
        })
    }
}

