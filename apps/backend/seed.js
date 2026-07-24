import 'dotenv/config'
import mongoose from 'mongoose'
import fs from 'fs/promises'
import { Plant } from './models/PlantSchema.js'

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('🔌 Conectado a MongoDB Atlas...')

    const rawData = await fs.readFile('./plants.json', 'utf-8')
    //lo convierte en un objeto/array que node puede entender
    const plants = JSON.parse(rawData)

    //Borra lo que hubiera para que esté limpio
    await Plant.deleteMany({})
    console.log('Colección anterior limpiada...')

    await Plant.insertMany(plants)
    console.log(`¡Éxito! Se han importado ${plants.length} plantas con toda su información detallada.`)

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('Error en el proceso de seed:', error)
    process.exit(1)
  }
}

seedDatabase()