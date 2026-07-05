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

//Get All plants
app.get('/plants', async (req, res) =>{
    return res.json(plants)
})

//get plant by id
app.get('/plants/:id', async (req, res) =>{
    const {id} = req.params
    const planta = plants.find(plant => plant.id === id)

    if(!planta){
        return res.status(404).json({message: 'Planta no encontrada'})
    }

    return res.json(planta)
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

app.patch('/plants/:id', (req, res) =>{
    const {id} = req.params

    const plantIndex = plants.findIndex(p => p.id === id)
    
    if (plantIndex === -1){
        return res.status(404).json({message: 'Planta no encontrada'})
    }

    const updatedPlant = {
        ...plants[plantIndex],
        ...req.body
    }

    plants[plantIndex] = updatedPlant
    return res.status(200).json(updatedPlant)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.delete('/plants/:id', (req, res) => {
    const {id} = req.params

    plants = plants.filter(plant => plant.id !== id)
    return res.status(200).json({message: 'Planta eliminada correctamente'})
})