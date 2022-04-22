import express from 'express'
import cors from 'cors'
import routes from './src/routes'
import bodyParser from 'body-parser'
import formidable from  'express-formidable'
import path, { resolve } from 'path'

declare global {
    namespace Express {
      interface Request {
        param: any[]
      }
    }
  }
  
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(bodyParser.json())
app.use('/image', express.static(resolve(__dirname, 'aplication', 'tmp', 'uploads')))

export{app}
