import {v2 as cloudinary} from 'cloudinary'
import {unlink, unlinkSync} from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadImage = async (filePath) => {
    try{
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'plants-app',
            transformation:[
                {width: 600, crop: 'limit'},
                {quality: 'auto'},
                {fetch_format: 'auto'}
            ]
        })

        unlinkSync(filePath)
        return result.secure_url
    }catch(error){
        console.error('Error subiendo a Cloudinary: ', error)
        throw error
    }
}