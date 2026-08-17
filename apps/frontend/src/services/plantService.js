import { API_URL } from "../config/api";

export async function sendPhotoToPlanetNet(photo){
    const formData = new FormData();
    formData.append('image', photo);
    
    const response = await fetch(`${API_URL}/identify`, {
            method: 'POST',
            body: formData
        }
    )

    if(response.status === 404) {
        throw new Error('No se ha reconocido la planta')
    }

    if (!response.ok){
        throw new Error('Error al comunicar con el servidor para identificar la planta')
    }

    const data = await response.json()
    return data
}