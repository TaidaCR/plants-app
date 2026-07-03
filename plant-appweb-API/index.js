import express from 'express'
import plantsJson from './plants.json' with { type: 'json' }
import cors from 'cors'
import crypto from 'crypto'

let plants = [...plantsJson]

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

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/plants', async (req, res) =>{
    return res.json(plants)
})

app.post('/plants', (req, res) =>{
    const {name, location, imageUrls, acquisition, sick, treatment, notes, watering, lightInfo, fertilization, misting} = req.body

    const newPlant = {
        id: crypto.randomUUID(),
        name, 
        location, 
        imageUrls, 
        acquisition, 
        sick, 
        treatment, 
        notes, 
        watering, 
        lightInfo, 
        fertilization, 
        misting
    }
    plants.push(newPlant)
    return res.status(201).json(newPlant)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})