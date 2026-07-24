import {PlantModel} from '../models/plant.js'
export class PlantController {
//Crear constructor cuando cree la base de datos y eliminar el static

    static async getAll(req, res){
        try{
            const plants = await PlantModel.getAll()

            return res.status(200).json(plants)
        }catch (error) {
            return res.status(500).json({ message: 'Error al obtener las plantas' })
        }
    }

    static async getById(req, res){
        try{
            const {id} = req.params
            const plant = await PlantModel.getById(id)

            if(!plant){
                return res.status(404).json({
                    error: 'Plant not found'
                })
            }

            return res.status(200).json(plant)
        } catch (error) {
            return res.status(400).json({ message: 'El ID proporcionado no es válido' })
        }
    }

    static async create(req, res){
        try {
            const newPlant = await PlantModel.create(req.body)
            return res.status(201).json(newPlant)
        } catch (error) {
            return res.status(400).json({ message: 'Error en los datos suministrados', details: error.message })
        }
    }

    static async update(req, res){
        try {
            const {id} = req.params

            const updatedPlant = await PlantModel.update(req.body, id)

            if (updatedPlant === null){
                return res.status(404).json({
                    error: 'Plant not found'
                })
            }

            return res.status(200).json(updatedPlant)
        } catch (error) {
            return res.status(400).json({ message: 'El ID proporcionado no es válido' })
        }
    }

    static async delete(req, res){
        try {
            const {id} = req.params

            const plantToDelete = await PlantModel.delete(id)
            if(plantToDelete === null){
                return res.status(404).json({
                    error: 'Plant not found'
                })
            }

            return res.status(200).json(plantToDelete)
        } catch (error) {
            return res.status(400).json({ message: 'El ID proporcionado no es válido' })
        }
    }
}