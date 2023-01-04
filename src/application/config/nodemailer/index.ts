import nodemailer from 'nodemailer'
import fs from 'fs'
import { send } from 'process';


type SendPasswordRecoveryRequest = {
    first_name: string;
    id: string;
    to: string
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
        let html = fs.readFileSync(__dirname+'/password_recovery.html', 'utf8')

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
        return html;
    }
}