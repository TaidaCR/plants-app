import { Plant } from './PlantSchema.js'

export class PlantModel {
    static async getAll() {

        return await Plant.find()
    }

    static async getById(id) {
        return await Plant.findById(id)
    }

    static async create(plantInfo) {
        return await Plant.create(plantInfo)
    }

    static async update(plantInfo, id) {
        return await Plant.findByIdAndUpdate(id, plantInfo, { new: true })
    }

    static async delete(id) {
        return await Plant.findByIdAndDelete(id)
    }
}