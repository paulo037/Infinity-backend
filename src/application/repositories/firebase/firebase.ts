import { randomBytes } from "crypto";
import { initializeApp, credential as _credential, storage } from "firebase-admin";
import dotenv from 'dotenv'


const serviceAccount = require("./firebase_key.json")
const BUCKET = "infinitymodas-203ad.appspot.com"
initializeApp({
    credential: _credential.cert(serviceAccount),
    storageBucket: BUCKET,
});

const bucket = storage().bucket();

const uploadImage = async (req: any, res: any) => {
    if (!req.file) return res.status(400).send();

    const buf = randomBytes(16);


    const nomeArquivo = `${buf.toString('hex')}-${req.file.originalname}`



    const image = req.file

    const file = bucket.file(`products / ${nomeArquivo}`)

    const stream = file.createWriteStream({
        metadata: {
            contentType: image.mimetype,
        },
    })

    stream.on("error", (e) => {
        console.error(e);
    })

    stream.on("finish", async () => {
        file.makePublic();
        

        req.file.firebaseUrl = file.publicUrl()
        console.log(req.file.firebaseUrl)
    })


    stream.end(image.buffer)
    res.status(200).send()

}

export default { uploadImage }