import express from 'express'
import cors from 'cors'
import { plantRouter } from './routes/plant.js';
import { connectDB } from './config/db.js';
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000;
const acceptedOrigins = process.env.ACCEPTED_ORIGINS ? process.env.ACCEPTED_ORIGINS.split(",") : []

app.use(cors({
    origin: (origin, callback) => {
        if(!origin || acceptedOrigins.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }}
}))

//Middleware global
app.use(express.json())

connectDB()

app.use('/plants', plantRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})