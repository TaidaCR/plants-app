import { useParams } from 'react-router-dom'
import { useChangeTitle } from '../hooks/setPageTitle'
import {useState} from 'react'
import { usePlantStore } from '../store/usePlantStore'
import {useNavigate} from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import arrowImg from '../assets/arrowBack.svg'
import CustomInput from '../Components/CustomInput';
import CustomTextArea from '../Components/CustomTextArea';
import CustomDatePicker from '../Components/CustomDatePicker'

export default function EditPlantPage() {

    const{updatePlant} = usePlantStore()
    const {id} = useParams()
    const plant = usePlantStore((state) => state.plants.find((p) => p.id ===id))

    const navigate = useNavigate()

    useChangeTitle(`Editar ${plant.name}`)  

    // GENERAL
    const [name, setName] = useState(plant.name)
    const [acquisition, setAcquisition] = useState(new Date(plant.acquisition))
    const [notes, setNotes] = useState(plant.notes || "")
    const [location, setLocation] = useState(plant.location)

    //RIEGO
    const [wateringFrequencyDays, setWateringFrequencyDays] = useState(plant.watering.frequencyDays)
    const [waterInfo, setWaterInfo] = useState(plant.watering.wateringInfo)
    const [lastWatering, setLastWatering] = useState(plant.watering.waterRecord.length === 0 ? null : new Date(plant.watering.waterRecord[plant.watering.waterRecord.length - 1]))

    //TRATAMIENTO
    const [treatmentFrequencyDays, setTreatmentFrequencyDays] = useState(plant.treatment.frequencyDays)
    const [treatmentInfo, setTreatmentInfo] = useState(plant.treatment.treatmentInfo)
    const [lastTreatment, setLastTreatment] = useState(plant.treatment.treatmentRecord.length === 0 ? null : new Date(plant.treatment.treatmentRecord[plant.treatment.treatmentRecord.length - 1]))

    console.log("lastTreatment" + lastTreatment)
    // FERTILIZACIÓN
    const [fertilizationFrequencyDays, setFertilizationFrequencyDays] = useState(plant.fertilization.frequencyDays)
    const [fertilizationInfo, setFertilizationInfo] = useState(plant.fertilization.fertilizationInfo)
    const [lastFertilizer, setLastFertilizer] = useState(plant.fertilization.fertilizerRecord.length === 0 ? null : new Date(plant.fertilization.fertilizerRecord[plant.fertilization.fertilizerRecord.length - 1]))

    // const [imgUrl, setImgUrl] = useState(plant.imgUrl)

    const handleSubmit = (e) =>  {
        e.preventDefault();
        const updatedPlant = {
            ...plant,
            name: name,
            acquisition: acquisition.toISOString().split('T')[0],
            notes: notes,
            location: location,
            watering: {
                ...plant.watering,
                waterRecord: lastWatering ? [...(plant.watering.waterRecord || []).slice(0, -1), lastWatering.toISOString().split('T')[0]] : plant.watering.waterRecord || [],
                frequencyDays: wateringFrequencyDays,
                waterInfo: waterInfo
            },
            treatment: {
                ...plant.treatment,
                treatmentRecord: lastTreatment ? [...(plant.treatment.treatmentRecord || []).slice(0, -1), lastTreatment.toISOString().split('T')[0]] : plant.treatment.treatmentRecord || [],
                frequencyDays: treatmentFrequencyDays,
                treatmentInfo: treatmentInfo
            },
            fertilization: {
                ...plant.fertilization,
                fertilizerRecord: lastFertilizer ? [...(plant.fertilization.fertilizerRecord || []).slice(0, -1), lastFertilizer.toISOString().split('T')[0]] : plant.fertilization.fertilizerRecord || [],
                frequencyDays: fertilizationFrequencyDays,
                fertilizationInfo: fertilizationInfo
            }
            // imgUrl: imgUrl
        }

        updatePlant(plant.id, updatedPlant)
        console.log(plant.watering.waterRecord)

        navigate(`/plantdetails/${plant.id}`)
    }

    return (
        <>
        {/* BARRA SUPERIOR ATRAS/NOMBRE/EDITAR */}
        <header className="fixed z-3 flex pt-[5px] pb-[5px] pr-[15px] pl-[15px] justify-start items-center w-full bg-secondary shadow top-0">
            <NavLink to={`/plantdetails/${plant.id}`} className="">
                <img width="25px" height="25px" src={arrowImg} />
            </NavLink>
            <h1 className="flex justify-center grow"> Editar {plant.name}</h1>
        </header>
        <form onSubmit={handleSubmit} className="flex flex-col p-[20px] pt-[85px] pb-[85px] gap-3">
            <h2 className="text-left bg-primary">INFO GENERAL</h2>
            <CustomInput type="text" text="Nombre:" placeholder={plant.name} value={name} handleOnChange={(e) => setName(e.target.value)}/>
            <CustomDatePicker text="Fecha adquisición:" name="acquisition" selected={acquisition} handleOnChange={(date) => setAcquisition(date)}/>
            <CustomInput type="text" text="Localización:" placeholder={location} value={location} handleOnChange={(e) => setLocation(e.target.value)}/>
            <CustomTextArea text="Notas:" value={notes} handleOnChange={(e) => setNotes(e.target.value)}/>

            {/* <label>
                <span>Imagen:</span>
                <input name="imgUrl" accept="imgage/*" id="plant-image" type="file" value={imgUrl} onChange={(e) => setImgUrl(e.target.files[0])}/>
            </label> */}
           <h2 className="text-left bg-primary">INFO RIEGO</h2>
            <CustomInput type="number" text="Frecuencia de riego:" placeholder={plant.watering.frequencyDays} value={wateringFrequencyDays} handleOnChange={(e) => setWateringFrequencyDays(e.target.value)}/>
            <CustomDatePicker text="Último riego" name="lastWatering" placeholderText="Selecciona una fecha" selected={lastWatering} handleOnChange={(date) => setLastWatering(date)}/>
            <CustomTextArea text="Info del riego:" value={waterInfo} handleOnChange={(e) => setWaterInfo(e.target.value)}/>

            <h2 className="text-left bg-primary">INFO TRATAMIENTO</h2>
            <CustomInput type="number" text="Frecuencia tratamiento:" placeholder={plant.treatment.frequencyDays} value={treatmentFrequencyDays} handleOnChange={(e) => setTreatmentFrequencyDays(e.target.value)}/>
            <CustomDatePicker text="Último tratamiento" name="lastTreatment" placeholderText="Selecciona una fecha" selected={lastTreatment} handleOnChange={(date) => setLastTreatment(date)}/>
            <CustomTextArea text="Info del tratamiento:" value={treatmentInfo} handleOnChange={(e) => setTreatmentInfo(e.target.value)}/>
           
           <h2 className="text-left bg-primary">INFO FERTILIZACIÓN</h2>
            <CustomInput type="number" text="Frecuencia fertilización:" placeholder={plant.fertilization.frequencyDays} value={fertilizationFrequencyDays} handleOnChange={(e) => setFertilizationFrequencyDays(e.target.value)}/>
            <CustomDatePicker text="Última fertilización" name="lastFertilizer" placeholderText="Selecciona una fecha" selected={lastFertilizer} handleOnChange={(date) => setLastFertilizer(date)}/>
            <CustomTextArea text="Info de fertilización:" value={fertilizationInfo} handleOnChange={(e) => setFertilizationInfo(e.target.value)}/>
            <button type="submit" className="bg-green-500 text-white p-2 rounded mt-2">Guardar</button>
            <NavLink type="submit" to={`/plantdetails/${plant.id}`} className="bg-red-500 text-white p-2 rounded mt-2">Cancelar</NavLink>
        </form>
        </>
    )
}