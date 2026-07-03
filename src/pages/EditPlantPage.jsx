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
import * as Switch from '@radix-ui/react-switch'

export default function EditPlantPage() {

    const{updatePlant} = usePlantStore()
    const {id} = useParams()
    const plant = usePlantStore((state) => state.plants.find((p) => p.id === id))

    const navigate = useNavigate()

    useChangeTitle(`Editar ${plant.name}`)  

    // GENERAL
    const [name, setName] = useState(plant?.name || "")
    const [acquisition, setAcquisition] = useState(plant?.acquisition ? new Date(plant.acquisition) : null)
    const [notes, setNotes] = useState(plant?.notes || "")
    const [location, setLocation] = useState(plant?.location || "")

    //RIEGO
    const [wateringFrequencyDays, setWateringFrequencyDays] = useState(plant?.watering?.frequencyDays || 0)
    const [waterInfo, setWaterInfo] = useState(plant?.watering?.wateringInfo || "")
    const [lastWatering, setLastWatering] = useState(plant?.watering?.waterRecord.length === 0 ? null : new Date(plant.watering.waterRecord[plant.watering.waterRecord.length - 1]))

    //TRATAMIENTO
    const [treatmentFrequencyDays, setTreatmentFrequencyDays] = useState(plant?.treatment?.frequencyDays || 0)
    const [treatmentInfo, setTreatmentInfo] = useState(plant?.treatment?.treatmentInfo || "")
    const [lastTreatment, setLastTreatment] = useState(plant?.treatment?.treatmentRecord.length === 0 ? null : new Date(plant.treatment.treatmentRecord[plant.treatment.treatmentRecord.length - 1]))

    console.log("lastTreatment" + lastTreatment)
    // FERTILIZACIÓN
    const [fertilizationRequired, setFertilizationRequired] = useState(plant?.fertilization?.required)
    const [fertilizationFrequencyDays, setFertilizationFrequencyDays] = useState(plant?.fertilization?.frequencyDays || 0)
    const [fertilizationInfo, setFertilizationInfo] = useState(plant?.fertilization?.fertilizationInfo || "")
    const [lastFertilizer, setLastFertilizer] = useState(plant?.fertilization?.fertilizerRecord.length === 0 ? null : new Date(plant.fertilization.fertilizerRecord[plant.fertilization.fertilizerRecord.length - 1]))

    //PULVERIZACIÓN
    const [mistingRequired, setMistingRequired] = useState(plant?.misting?.required)
    const [mistingFrequencyDays, setMistingFrequencyDays] = useState(plant?.misting?.frequencyDays || 0)

    //ENFERMA
    const [sick, setSick] = useState(plant?.sick || false)

    //ILUMINACIÓN
    const [lightInfo, setLightInfo] = useState(plant?.lightInfo || "")

    const handleSubmit = (e) =>  {
        e.preventDefault();
        const updatedPlant = {
            ...plant,
            name: name,
            acquisition: acquisition.toISOString().split('T')[0],
            notes: notes,
            location: location,
            sick: sick,
            watering: {
                ...plant.watering,
                waterRecord: lastWatering ? [...(plant.watering.waterRecord || []).slice(0, -1), lastWatering.toISOString().split('T')[0]] : plant.watering.waterRecord || [],
                frequencyDays: wateringFrequencyDays,
                wateringInfo: waterInfo
            },
            treatment: {
                ...plant.treatment,
                treatmentRecord: lastTreatment ? [...(plant.treatment.treatmentRecord || []).slice(0, -1), lastTreatment.toISOString().split('T')[0]] : plant.treatment.treatmentRecord || [],
                frequencyDays: treatmentFrequencyDays,
                treatmentInfo: treatmentInfo
            },
            fertilization: {
                ...plant.fertilization,
                required: fertilizationRequired,
                fertilizerRecord: fertilizationRequired && lastFertilizer ? [...(plant.fertilization.fertilizerRecord || []).slice(0, -1), lastFertilizer.toISOString().split('T')[0]] : [],
                frequencyDays: fertilizationRequired ? fertilizationFrequencyDays : 0,
                fertilizationInfo: fertilizationRequired ? fertilizationInfo : ""
            },
            lightInfo: lightInfo,
            misting: {
                ...plant.misting,
                required: mistingRequired,
                frequencyDays: mistingFrequencyDays
            }
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
        <form onSubmit={handleSubmit} className="flex flex-col p-[10px] pt-[85px] pb-[85px] gap-3">
            <section className="p-[20px] bg-[#f2f4f2] rounded-4xl text-left gap-[10px] flex flex-col">
                <h2 className="uppercase text-dark">Info general</h2>
                <CustomInput type="text" text="Nombre:" placeholder={plant.name} value={name} handleOnChange={(e) => setName(e.target.value)}/>
                <CustomDatePicker text="Fecha adquisición:" name="acquisition" selected={acquisition} handleOnChange={(date) => setAcquisition(date)}/>
                <CustomInput type="text" text="Localización:" placeholder={location} value={location} handleOnChange={(e) => setLocation(e.target.value)}/>
                <CustomTextArea text="Notas:" value={notes} handleOnChange={(e) => setNotes(e.target.value)}/>

            </section>
               <section className="p-[20px] bg-[#f2f4f2] rounded-4xl text-left gap-[10px] flex flex-col">
           <h2 className="uppercase text-dark">ILUMINACIÓN</h2>
            <CustomTextArea text="Info de iluminación:" value={lightInfo} handleOnChange={(e) => setLightInfo(e.target.value)}/>
            </section>
            <section className="p-[20px] bg-[#f2f4f2] rounded-4xl text-left gap-[10px] flex flex-col">
                <h2 className="uppercase text-dark">INFO RIEGO</h2>
                        <CustomInput type="number" text="Frecuencia de riego:" placeholder={plant.watering.frequencyDays} value={wateringFrequencyDays} handleOnChange={(e) => setWateringFrequencyDays(e.target.value)}/>
                        <CustomDatePicker text="Último riego" name="lastWatering" placeholderText="Selecciona una fecha" selected={lastWatering} handleOnChange={(date) => setLastWatering(date)}/>
                        <CustomTextArea text="Info del riego:" value={waterInfo} handleOnChange={(e) => setWaterInfo(e.target.value)}/>
            </section>
            <section className="p-[20px] bg-[#f2f4f2] rounded-4xl text-left gap-[10px] flex flex-col"> 
                <h2 className="uppercase text-dark">INFO TRATAMIENTO</h2>
            <div className="flex justify-between">
                <p>Enferma:</p>
                <Switch.Root checked={sick} onCheckedChange={(checked) => setSick(checked)} className="w-11 h-6 bg-gray-300 data-[state=checked]:bg-accentStrong rounded-full relative transition-colors duration-200 ease-in-out outline-none cursor-pointer">
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out translate-x-0.5 data-[state=checked]:translate-x-[22px]"/>
                </Switch.Root>
            </div>
            {sick ?
            <>
            <CustomInput type="number" text="Frecuencia tratamiento:" placeholder={plant.treatment.frequencyDays} value={treatmentFrequencyDays} handleOnChange={(e) => setTreatmentFrequencyDays(e.target.value)}/>
            <CustomDatePicker text="Último tratamiento" name="lastTreatment" placeholderText="Selecciona una fecha" selected={lastTreatment} handleOnChange={(date) => setLastTreatment(date)}/>
            <CustomTextArea text="Info del tratamiento:" value={treatmentInfo} handleOnChange={(e) => setTreatmentInfo(e.target.value)}/>
            </>
            : <></>
            }</section>
           
      <section className="p-[20px] bg-[#f2f4f2] rounded-4xl text-left gap-[10px] flex flex-col">      
           <h2 className="uppercase text-dark">INFO FERTILIZACIÓN</h2>
            <div className="flex justify-between">
                <p>¿Requiere fertilización?:</p>
                <Switch.Root checked={fertilizationRequired} onCheckedChange={(checked) => setFertilizationRequired(checked)} className="w-11 h-6 bg-gray-300 data-[state=checked]:bg-accentStrong rounded-full relative transition-colors duration-200 ease-in-out outline-none cursor-pointer">
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out translate-x-0.5 data-[state=checked]:translate-x-[22px]"/>
                </Switch.Root>
            </div>
            {fertilizationRequired ?
            <>
            <CustomInput type="number" text="Frecuencia fertilización:" placeholder={plant.fertilization.frequencyDays} value={fertilizationFrequencyDays} handleOnChange={(e) => setFertilizationFrequencyDays(e.target.value)}/>
            <CustomDatePicker text="Última fertilización" name="lastFertilizer" placeholderText="Selecciona una fecha" selected={lastFertilizer} handleOnChange={(date) => setLastFertilizer(date)}/>
            <CustomTextArea text="Info de fertilización:" value={fertilizationInfo} handleOnChange={(e) => setFertilizationInfo(e.target.value)}/>
            </>
            : <></>
            }
            </section>
            <section className="p-[20px] bg-[#f2f4f2] rounded-4xl text-left gap-[10px] flex flex-col">   
           <h2 className="uppercase text-dark">PULVERIZACIÓN</h2>
            <div className="flex justify-between">
                <p>¿Requiere pulverización?:</p>
                <Switch.Root checked={mistingRequired} onCheckedChange={(checked) => setMistingRequired(checked)} className="w-11 h-6 bg-gray-300 data-[state=checked]:bg-accentStrong rounded-full relative transition-colors duration-200 ease-in-out outline-none cursor-pointer">
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out translate-x-0.5 data-[state=checked]:translate-x-[22px]"/>
                </Switch.Root>
            </div>
            {mistingRequired ?
            <CustomInput type="number" text="Frecuencia de pulverización:" placeholder={plant.misting.frequencyDays} value={mistingFrequencyDays} handleOnChange={(e) => setMistingFrequencyDays(e.target.value)}/>
            : <></>
            }
            </section>
            <button type="submit" className="bg-green-500 text-white p-2 rounded mt-2">Guardar</button>
            <NavLink type="submit" to={`/plantdetails/${plant.id}`} className="bg-red-500 text-white p-2 rounded mt-2">Cancelar</NavLink>
        </form>
        </>
    )
}