import {create} from 'zustand'
// import initialPlants from '../data/plants.json'

//Hook personalizado
export const usePlantStore = create((set) => ({
    plants: [],
    loading: false,

    fetchPlants: async () =>{
        set({loading: true})
        try{
            const res = await fetch('http://localhost:3000/plants')
            if (!res.ok) throw new Error('Error al conectar a la API')
            const data = await res.json()
            set({plants: data, loading: false})
        }catch (error){
            console.log(error)
            set({loading: false})
        }
    },

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

    addPlant: async (newPlant) => {
    set({loading: true, error: null})
    try{
        const res = await fetch('http://localhost:3000/plants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' },
            body: JSON.stringify(newPlant)
        })
        if(!res.ok) throw new Error('Error en la petición')
        
        const result = await res.json()
        set((state) => ({
            plants: [...state.plants, result],
            loading: false
        }))

    }catch(error){
        set({error: error.message, loading: false})
    }
    }
}))