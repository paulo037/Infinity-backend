"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const firebase_admin_1 = require("firebase-admin");
const serviceAccount = require("./firebase_key.json");
const BUCKET = "infinitymodas-203ad.appspot.com";
(0, firebase_admin_1.initializeApp)({
    credential: firebase_admin_1.credential.cert(serviceAccount),
    storageBucket: BUCKET,
});
const bucket = (0, firebase_admin_1.storage)().bucket();
const uploadImage = async (req, res) => {
    if (!req.file)
        return res.status(400).send();
    const buf = (0, crypto_1.randomBytes)(16);
    const nomeArquivo = `${buf.toString('hex')}-${req.file.originalname}`;
    const image = req.file;
    const file = bucket.file(`products / ${nomeArquivo}`);
    const stream = file.createWriteStream({
        metadata: {
            contentType: image.mimetype,
        },
    });
    stream.on("error", (e) => {
        console.error(e);
    });
    stream.on("finish", async () => {
        file.makePublic();
        req.file.firebaseUrl = file.publicUrl();
        console.log(req.file.firebaseUrl);
    });
    stream.end(image.buffer);
    res.status(200).send();
};
exports.default = { uploadImage };
