import { create } from 'zustand'
// import initialPlants from '../data/plants.json'

//Añadimos helper timeout para el fetch
const fetchWithTimeout = async (url, options = {}, timeoutMs = 30000) => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)
    try {
        const res = await fetch(url, { ...options, signal: controller.signal })
        return res
    } finally {
        clearTimeout(timeout)
    }
}


//Hook personalizado
export const usePlantStore = create((set) => ({
    plants: [],
    loading: false,

    fetchPlants: async () => {
        set({ loading: true })
        try {
            const res = await fetch('https://plants-app-backend.onrender.com/plants')
            if (!res.ok) throw new Error('Error al conectar a la API')
            const data = await res.json()
            set({ plants: data, loading: false })
        } catch (error) {
            console.log(error)
            set({ loading: false })
        }
    },

    waterPlant: async (plantId) => {
        const { plants, updatePlant } = usePlantStore.getState();
        const targetPlant = plants.find(p => (p.id || p._id) === plantId)

        if (!targetPlant) return

        const today = new Date().toISOString().split('T')[0]
        const currentWaterRecord = targetPlant.watering?.waterRecord || []

        const updatedPlant = {
            ...targetPlant,
            id: plantId,
            watering: {
                ...targetPlant.watering,
                waterRecord: [...currentWaterRecord, today]
            }
        }

        await updatePlant(updatedPlant)
    },

    fertilizePlant: async (plantId) => {
        const { plants, updatePlant } = usePlantStore.getState();
        const targetPlant = plants.find(p => (p.id || p._id) === plantId)

        if (!targetPlant) return

        const today = new Date().toISOString().split('T')[0]
        const currentFertilizerRecord = targetPlant.fertilization?.fertilizerRecord || []

        const updatedPlant = {
            ...targetPlant,
            id: plantId,
            fertilization: {
                ...targetPlant.fertilization,
                fertilizerRecord: [...currentFertilizerRecord, today]
            }
        }

        await updatePlant(updatedPlant)
    },

    treatPlant: async (plantId) => {
        const { plants, updatePlant } = usePlantStore.getState();
        const targetPlant = plants.find(p => (p.id || p._id) === plantId)

        if (!targetPlant) return

        const today = new Date().toISOString().split('T')[0]
        const currentTreatmentRecord = targetPlant.treatment?.treatmentRecord || []

        const updatedPlant = {
            ...targetPlant,
            id: plantId,
            treatment: {
                ...targetPlant.treatment,
                treatmentRecord: [...currentTreatmentRecord, today]
            }
        }

        await updatePlant(updatedPlant)
    },

    updatePlant: async (updatedPlant) => {
        set({ loading: true, error: null })
        try {
            const res = await fetch(`https://plants-app-backend.onrender.com/plants/${updatedPlant.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPlant)
            })

            if (!res.ok) throw new Error('Error en la petición')

            const result = await res.json()
            set((state) => ({
                plants: state.plants.map(p => p.id === result.id ? result : p),
                loading: false
            }))
        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },

    deleteComment: (plantId, commentId) => set((state) => ({
        plants: state.plants.map((plant) => {
            if (plant.id === plantId) {
                return {
                    ...plant,
                    comments: plant.comments.filter(c => c.id !== commentId)
                }
            }
            return plant
        }
        )
    })),

    deletePlant: async (plant) => {
        set({ error: null, loading: true })
        try {
            const res = await fetch(`https://plants-app-backend.onrender.com/plants/${plant.id}`, {
                method: 'DELETE'
            })

            if (!res.ok) throw new Error('Error en la petición')

            set((state) => ({
                plants: state.plants.filter(p => p.id !== plant.id),
                loading: false
            }))

        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },

    addPlant: async (newPlant) => {
        set({ loading: true, error: null })
        try {
            const res = await fetchWithTimeout('https://plants-app-backend.onrender.com/plants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPlant)
            })


            if (!res.ok) throw new Error('Error en la petición')

            const result = await res.json()
            set((state) => ({
                plants: [...state.plants, result],
                loading: false
            }))

        } catch (error) {
            set({ error: error.message, loading: false })
            throw error
        }
    }
}))