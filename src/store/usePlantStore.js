import {create} from 'zustand'
import initialPlants from '../data/plants.json'

//Hook personalizado
export const usePlantStore = create((set) => ({
    plants: initialPlants,

    waterPlant: (plantId) => set((state) => ({
        plants: state.plants.map((plant) =>
        plant.id === plantId ? {...plant, waterRecord: [...plant.waterRecord, new Date().toISOString().split('T')[0]]} : plant)
    })),

    fertilizePlant: (plantId) => set((state) => ({
        plants: state.plants.map((plant) =>
        plant.id === plantId ? {...plant, fertilizerRecord: [...plant.fertilizerRecord, new Date().toISOString().split('T')[0]]} : plant)
    })),

    updatePlant: (plantId, updatedPlant) => set((state) => ({
        plants: state.plants.map((plant) =>
            plant.id === plantId ? {...plant, ...updatedPlant} : plant
        )
    }))
}))