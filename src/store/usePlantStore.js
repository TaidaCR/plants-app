import {create} from 'zustand'
import initialPlants from '../data/plants.json'

//Hook personalizado
export const usePlantStore = create((set) => ({
    plants: initialPlants,

    waterPlant: (plantId) => set((state) => ({
        plants: state.plants.map((plant) =>
        plant.id === plantId ? {...plant, watering: {...plant.watering, waterRecord: [...plant.watering.waterRecord, new Date().toISOString().split('T')[0]]}} : plant)
    })),

    fertilizePlant: (plantId) => set((state) => ({
        plants: state.plants.map((plant) =>
        plant.id === plantId ? {...plant, fertilization: {...plant.fertilization, fertilizerRecord: [...plant.fertilization.fertilizerRecord, new Date().toISOString().split('T')[0]]}} : plant)
    })),

    treatPlant: (plantId) => set((state) =>({
        plants: state.plants.map((plant) => 
        plant.id === plantId ? {...plant, treatment: {...plant.treatment, treatmentRecord: [...plant.treatment.treatmentRecord, new Date().toISOString().split('T')[0]]}} : plant
        )
    })),

    updatePlant: (plantId, updatedPlant) => set((state) => ({
        plants: state.plants.map((plant) =>
            plant.id === plantId ? {...plant, ...updatedPlant} : plant
        )
    })),

    deleteComment: (plantId, commentId) => set((state) => ({
        plants: state.plants.map((plant) => {
            if (plant.id===plantId){
                return {
                    ...plant,
                    comments: plant.comments.filter(c => c.id !== commentId)
                }
            }
            return plant
        }
        )
    })),

    addPlant: (newPlant) => set((state) => ({
        plants: [
            ...state.plants,
            newPlant
        ]
    }))
}))