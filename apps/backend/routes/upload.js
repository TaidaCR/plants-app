import {Router} from 'express'
import multer from 'multer'
import {uploadImage} from '../utils/uploadImage.js'

export const uploadRouter = Router()

const storage = multer.diskStorage({
filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({storage})

uploadRouter.post('/', upload.single('image'), async (req, res) =>{
    try{
        if(!req.file){
            return res.status(400).json({error: 'No se envió ninguna imagen'})
        }

        const url = await uploadImage(req.file.path)
        res.json({url})
    }catch(error){
        res.status(500).json({error: 'Error al subir la imagen'})
    }
})