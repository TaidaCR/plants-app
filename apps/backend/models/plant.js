import plants from '../plants.json' with {type: 'json'}
import crypto from 'crypto'

export class PlantModel{
    static async getAll(){
        
        return plants
    }

    static async getById(id){
        const plant = plants.find(p => p.id === id)
        return plant
    }

    static async create(plantInfo){
        const newPlant = {
            id: crypto.randomUUID(),
            ...plantInfo
        }

        plants.push(newPlant)

        return newPlant
    }

    static async update(plantInfo, id){
        const plantIndex = plants.findIndex(p => p.id === id)
        
        if (plantIndex === -1){
            return null
        }

        const updatedPlant = {
            ...plants[plantIndex],
            ...plantInfo
        }
        
        plants[plantIndex] = updatedPlant
        return updatedPlant
    }

    static async delete(id){
        const plantIndex = plants.findIndex(p => p.id === id)

        if (plantIndex === -1){
            return null
        }

        const plantToDelete = plants[plantIndex]

        plants.splice(plantIndex, 1)
        return plantToDelete
    }
}