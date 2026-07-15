import {Router} from 'express'
import {PlantController} from '../controllers/plant.js'

export const plantRouter = Router()

plantRouter.get('/', PlantController.getAll)
plantRouter.get('/:id', PlantController.getById)
plantRouter.post('/', PlantController.create)
plantRouter.patch('/:id', PlantController.update)
plantRouter.delete('/:id', PlantController.delete)