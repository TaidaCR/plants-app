import {Router} from 'express'
import multer from 'multer'

export const analyzePhotoRouter = Router()

const upload = multer({ storage: multer.memoryStorage() })


analyzePhotoRouter.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No se envió ninguna imagen' })

        const form = new FormData()
                                // Binary Large Object
        form.append('images', new Blob([req.file.buffer], {type: req.file.mimetype}), req.file.originalname)  // ← buffer directo
        form.append('organs', 'auto')

        const apiUrl = `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.PLANTNET_API_KEY}&lang=es`
        const plantnetRes = await fetch(apiUrl, 
            { method: 'POST', body: form }
        )

        if (plantnetRes.status === 404) {
            return res.status(404).json({ error: 'No se ha reconocido la planta' })
        }

        // Manejar errores de PlantNet
        if (!plantnetRes.ok) {
            const errData = await plantnetRes.json().catch(() => null)
            console.error('PlantNet error:', plantnetRes.status, errData)
            return res.status(502).json({ error: 'PlantNet no pudo procesar la imagen' })
        }

        const data = await plantnetRes.json()
        const best = data.results?.[0]

        // Sin coincidencias
        if (!best) {
            return res.status(404).json({ error: 'No se pudo identificar la planta' })
        }

        //Responder objeto limpio
        const { species } = best
        res.json({
            bestMatch: data.bestMatch,
            scientificName: species.scientificNameWithoutAuthor,
            commonNames: species.commonNames || [],
            family: species.family?.scientificNameWithoutAuthor,
            genus: species.genus?.scientificNameWithoutAuthor,
            score: best.score
        })

    } catch (error) {
        console.error('Error analizando la imagen:', error)
        res.status(500).json({ error: 'Error al analizar la imagen' })
    }
})