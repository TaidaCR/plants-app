import express from 'express'
import cors from 'cors'
import { plantRouter } from './routes/plant.js';

const app = express()
const port = 3000;
const acceptedOrigins = ['http://localhost:5173']

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

app.use('/plants', plantRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})