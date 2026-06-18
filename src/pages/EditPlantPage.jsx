import { useParams } from 'react-router-dom'
import plants from '../data/plants.json'
import { useChangeTitle } from '../hooks/setPageTitle'
import DatePicker from 'react-datepicker'
import {useState} from 'react'
import "react-datepicker/dist/react-datepicker.css";

export default function EditPlantPage() {
    const {id} = useParams()
    const plant = plants.find((p) => p.id ===id)
    const [acqDate, setAcqDate] = useState(new Date())

    useChangeTitle(`Editar ${plant.name}`)    

    const handleSubmit = () => {

    }

    return (
        <form className="flex flex-col p-[20px]">
            <h1>Editar planta</h1>
            <label>
                <span className="flex">Nombre:</span>
                <input type="text" name="name" placeholder={plant.name} autocomplete="off"/>
            </label>
            <label>
                <span className="flex">Fecha adquisición:</span>
                <DatePicker name="acquisition" placeholder={plant.acquisition} dateFormat="dd/MM/yyy" selected={acqDate} onChange={date => setAcqDate(date)}/>
            </label>
            <button onSubmit={handleSubmit}></button>
        </form>
    )
}