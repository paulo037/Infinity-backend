import express from 'express'
import cors from 'cors'
import routes from './routes'
import bodyParser from 'body-parser'
import morgan from 'morgan'


const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));
app.use(routes)
app.use('/image',express.static(__dirname + '/application/tmp/uploads'))


export {app}