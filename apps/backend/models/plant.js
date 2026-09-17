import { Plant } from './PlantSchema.js'

export class PlantModel {
    static async getAll(userId) {
        return await Plant.find({userId})
    }

    static async getById(id, userId) {
        return await Plant.findOne({_id: id, userId})
    }

    static async create(plantInfo, userId) {
        console.log('PlantModel.create - plantInfo:', plantInfo)
        console.log('PlantModel.create - userId:', userId)
        return await Plant.create({...plantInfo, userId})
    }

    static async update(plantInfo, id, userId) {
        return await Plant.findOneAndUpdate({_id: id, userId}, plantInfo, { new: true })
    }

    static async delete(id, userId) {
        return await Plant.findOneAndDelete({_id: id, userId})
    }
}