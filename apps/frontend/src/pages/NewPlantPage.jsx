import { useChangeTitle } from "../hooks/setPageTitle"
import CustomDatePicker from "../Components/CustomDatePicker"
import CustomInput from "../Components/CustomInput"
import CustomTextArea from "../Components/CustomTextArea"
import { usePlantStore } from "../store/usePlantStore"
import { useState } from "react"
import * as Switch from '@radix-ui/react-switch'
import { useNavigate } from "react-router-dom"
import { upLoadImageToCloudinary } from "../utils/uploadImage.js"

export default function NewPlant() {
    useChangeTitle("Nueva Planta")

    const { addPlant } = usePlantStore()
    const plantas = usePlantStore(state => state.plants)
    const [acqDate, setAcqDate] = useState(null)
    const [imageUrls, setImageUrls] = useState([])
    const [uploading, setUploading] = useState(false)
    const [sick, setSick] = useState(false)
    const [mistingRequired, setMistingRequired] = useState(false)
    const [fertilizationRequired, setFertilizationRequired] = useState(false)
    const navigate = useNavigate()

    const handleSaveImgs = async (selectedImgs) => {
        const filesArray = Array.from(selectedImgs)
        var uploadedCloudinaryUrls = null;

        if (filesArray.length > 0) {
            // Mapeamos cada archivo a una promesa de subida
            const uploadPromises = filesArray.map(file => upLoadImageToCloudinary(file));

            // Esperamos a que TODAS las promesas se resuelvan
            uploadedCloudinaryUrls = await Promise.all(uploadPromises);

            // uploadedCloudinaryUrls contendrá un array con todas las URLs devueltas [url1, url2, ...]
        }

        if (!uploadedCloudinaryUrls) {
            return
        }

        setImageUrls((prevUrls) =>
            [...prevUrls,
            ...uploadedCloudinaryUrls])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true)


        const data = new FormData(e.target)
        const newPlantData = Object.fromEntries(data.entries())

        const newPlant = {
            id: crypto.randomUUID(),
            name: newPlantData.name,
            location: newPlantData.location,
            imageUrls: imageUrls,
            lightInfo: newPlantData.lightInfo,
            acquisition: acqDate ? acqDate.toISOString().split('T')[0] : null,
            sick: sick,
            treatment: {
                frequencyDays: Number(newPlantData.treatmentFrequencyDays) || 0,
                treatmentInfo: newPlantData.treatmentInfo || "",
                treatmentRecord: []
            },
            notes: newPlantData.notes,
            comments: [],
            watering: {
                frequencyDays: Number(newPlantData.waterFrequencyDays) || 0,
                wateringInfo: newPlantData.wateringInfo || "",
                waterRecord: []
            },
            fertilization: {
                required: fertilizationRequired,
                frequencyDays: fertilizationRequired ? Number(newPlantData.fertilizationFrequencyDays) || 0 : 0,
                fertilizationInfo: fertilizationRequired ? newPlantData.fertilizationInfo || "" : "",
                fertilizerRecord: []
            },
            misting: {
                required: mistingRequired,
                frequencyDays: Number(newPlantData.mistingFrequencyDays) || 0
            }
        }

        await addPlant(newPlant)
        setUploading(true)
        console.log(plantas)
        navigate("/")
    }

    return (
        <form className="p-5 flex flex-col gap-[10px] pb-[70px]" onSubmit={(e) => handleSubmit(e)} autocomplete="off">
            <h1>Nueva planta</h1>
            <CustomInput text="Nombre" type="text" placeholder="Introduce el nombre" name="name" />
            <CustomDatePicker name="acquisition" placeholderText="Fecha adquisición" text="Fecha adquisición" selected={acqDate} handleOnChange={(date) => setAcqDate(date)} />
            <CustomInput text="Localización" type="text" placeholder="Introduce ubicación" name="location" />
            <label className="pb-[10px] bg-white p-3 rounded-xl flex justify-between font-normal text-detail ">
                <span class="flex">Imágenes</span>
                <input multiple type="file" accept="image/*" onChange={(e) => handleSaveImgs(e.target.files)} />
            </label>
            <div className="flex gap-2 p-[20px] overflow-x-auto snap-x snap-mandatory">
                {imageUrls?.map((url, i) => (
                    <img key={i} className="aspect-square rounded-lg shadow shrink-0 snap-center w-[30%] object-cover" src={url} alt={`Foto ${i + 1} de ${name}`} />
                ))}
            </div>


            <CustomTextArea name="wateringInfo" text="Info de riego" />
            <CustomInput name="wateringFrequencyDays" type="number" text="Frecuencia de riego" />

            <CustomTextArea name="lightInfo" text="Info de iluminación" />

            <div className="flex justify-between">
                <p>¿Requiere fertilización?:</p>
                <Switch.Root name="fertilizationRequired" checked={fertilizationRequired} onCheckedChange={(checked) => setFertilizationRequired(checked)} className="w-11 h-6 bg-gray-300 data-[state=checked]:bg-accentStrong rounded-full relative transition-colors duration-200 ease-in-out outline-none cursor-pointer">
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
            </div>
            {fertilizationRequired ?
                <>
                    <CustomTextArea name="fertilizationInfo" text="Info de fertilización" />
                    <CustomInput name="fertilizationFrequencyDays" type="number" text="Frecuencia de fertilización" />
                </>
                : <></>
            }

            <div className="flex justify-between">
                <p>Enferma:</p>
                <Switch.Root name="sick" checked={sick} onCheckedChange={(checked) => setSick(checked)} className="w-11 h-6 bg-gray-300 data-[state=checked]:bg-accentStrong rounded-full relative transition-colors duration-200 ease-in-out outline-none cursor-pointer">
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
            </div>
            {sick ?
                <>
                    <CustomInput text="Frecuencia tratamiento" type="number" placeholder="Introduce frecuencia tratamiento" name="treatmentFrequencyDays" />
                    <CustomTextArea text="Info del tratamiento" name="treatmentInfo" />
                </>

                :
                <></>
            }
            <div className="flex justify-between">
                <p>¿Requiere pulverización?:</p>
                <Switch.Root name="mistingRequired" checked={mistingRequired} onCheckedChange={(checked) => setMistingRequired(checked)} className="w-11 h-6 bg-gray-300 data-[state=checked]:bg-accentStrong rounded-full relative transition-colors duration-200 ease-in-out outline-none cursor-pointer">
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
            </div>
            {mistingRequired ?
                <CustomInput text="Frecuencia de pulverización" type="number" placeholder="Introduce frecuencia de pulverización" name="mistingFrequencyDays" />
                : <></>
            }
            <CustomTextArea text="Notas" name="notes" />

            <button disabled={uploading} className="bg-accent w-[170px] shadow p-2 rounded-full font-medium self-center" type="submit">
                {uploading ? 'Subiendo imagen...' : 'Guardar planta'}
            </button>
        </form>
    )
}