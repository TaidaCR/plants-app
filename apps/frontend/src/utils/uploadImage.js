import { API_URL } from "../config/api"; 

export const upLoadImageToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
    })

    if (!res.ok) throw new Error('Error al subir la imagen a Cloudinary')

    const data = await res.json()
    return data.url
}