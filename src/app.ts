import express from 'express'
import cors from 'cors'
import routes from './routes'
import bodyParser from 'body-parser'
import coockieParser from 'cookie-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'


dotenv.config()

const app = express()

app.use(morgan(`:method\t:status\t:response-time ms\t:date[web]\t:url`));
app.use(coockieParser())
app.use(cors({ credentials: true, origin: process.env.BASE_FRONT }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes)
app.use('/image', express.static(__dirname + '/application/tmp/uploads'))


export { app }