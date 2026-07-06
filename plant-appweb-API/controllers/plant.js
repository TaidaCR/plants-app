import {PlantModel} from '../models/plant.js'
export class PlantController {
//Crear constructor cuando cree la base de datos y eliminar el static

    static async getAll(req, res){
        const plants = await PlantModel.getAll()

        return res.json(plants).status(200)
    }

    static async getById(req, res){
        const {id} = req.params
        const plant = await PlantModel.getById(id)

        if(!plant){
            return res.status(404).json({
                error: 'Plant not found'
            })
        }

        return res.json(plant).status(200)
    }

    static async create(req, res){
        const newPlant = await PlantModel.create(req.body)

        return res.status(201).json(newPlant)
    }

    static async update(req, res){
        const {id} = req.params

        const updatedPlant = await PlantModel.update(req.body, id)

        if (updatedPlant === null){
            return res.status(404).json({
                error: 'Plant not found'
            })
        }

        return res.status(200).json(updatedPlant)
    }

    static async delete(req, res){
        const {id} = req.params

        const plantToDelete = await PlantModel.delete(id)
        if(plantToDelete === null){
            return res.status(404).json({
                error: 'Plant not found'
            })
        }

        return res.status(200).json(plantToDelete)
    }
}