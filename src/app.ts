import express from 'express'
import cors from 'cors'
import routes from './routes'
import bodyParser from 'body-parser'



const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(routes)
app.use('/image',express.static(__dirname + '/application/tmp/uploads'))
console.log(__dirname + '/application/tmp/uploads -> app.ts')

export   {app}