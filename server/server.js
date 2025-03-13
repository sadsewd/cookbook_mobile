import express from 'express'
import cors from 'cors'
import routes from './routes.js'
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT || 3001

app.use(cors({ origin: 'http://localhost:8081', credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use('/', routes)

app.listen(port, () => console.log(`Server is running on port ${port || 3001}`))
