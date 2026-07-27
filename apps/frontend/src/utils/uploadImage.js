export const upLoadImageToCloudinary = async (file) => {

    const cloudName = 'rlsuwfos'
    const uploadPreset = 'fkxt2c6h'

    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)

    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        })

        if (!res.ok) throw new Error('Error al subir la imagen a Cloudinary')

        const data = await res.json()

        const optimizedUrl = data.secure_url.replace(
            '/upload/',
            '/upload/w_800,c_limit,q_auto,f_auto/'
        )

        return optimizedUrl
    } catch (error) {
        console.error('Error uploading image:', error)
        return null
    }
}