import { useParams } from 'react-router-dom'
import plants from '../data/plants.json'


export default function EditPlantPage() {
    const {id} = useParams()
    const plant = plants.find((p) => p.id ===id)

    return (
        <form>
            <h1>Editar planta</h1>
            <label>
                Nombre:
            </label>
            <input placeholder={plant.name} type="text" />
        </form>
    )
}