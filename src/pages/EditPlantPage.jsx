import { useParams } from 'react-router-dom'
import { useChangeTitle } from '../hooks/setPageTitle'
import DatePicker from 'react-datepicker'
import {useState} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { usePlantStore } from '../store/usePlantStore'
import {useNavigate} from 'react-router-dom'
import { NavLink } from 'react-router-dom';

export default function EditPlantPage() {

    const{updatePlant} = usePlantStore()
    const {id} = useParams()
    const plant = usePlantStore((state) => state.plants.find((p) => p.id ===id))

    const navigate = useNavigate()

    useChangeTitle(`Editar ${plant.name}`)  

    const [name, setName] = useState(plant.name)
    const [acquisition, setAcquisition] = useState(new Date(plant.acquisition))
    const [notes, setNotes] = useState(plant.notes || "")
    const [location, setLocation] = useState(plant.location)

    const handleSubmit = (e) =>  {
        e.preventDefault();
        const updatedPlant = {
            ...plant,
            name: name,
            acquisition: acquisition.toISOString().split('T')[0],
            notes: notes,
            location: location
        }

        updatePlant(plant.id, updatedPlant)
        navigate(`/plantdetails/${plant.id}`)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-[20px]">
            <h1>Editar planta</h1>
            <label>
                <span className="flex">Nombre:</span>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={plant.name} autoComplete="off"/>
            </label>
            <label>
                <span className="flex">Fecha adquisición:</span>

                {/* DatePicker dispara un date no un evento */}
                <DatePicker name="acquisition" dateFormat="dd/MM/yyyy" selected={acquisition} onChange={(date) => setAcquisition(date)}/>
            </label>
            <label>
                <span className="flex">Notas:</span>
                <textarea type="text" rows="6" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
            </label>
            <label>
                <span>Localización:</span>
                <input type="text" name="location" value={location} placeholder={location} onChange={(e) => setLocation(e.target.value)}/>
            </label>

            <button type="submit" className="bg-green-500 text-white p-2 rounded mt-2">Guardar</button>
            <NavLink type="submit" to={`/plantdetails/${plant.id}`} className="bg-red-500 text-white p-2 rounded mt-2">Cancelar</NavLink>
        </form>
    )
}