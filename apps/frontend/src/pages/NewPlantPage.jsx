import { useChangeTitle } from "../hooks/setPageTitle"
import CustomDatePicker from "../Components/CustomDatePicker"
import CustomInput from "../Components/CustomInput"
import CustomTextArea from "../Components/CustomTextArea"
import { usePlantStore } from "../store/usePlantStore"
import imgUploadImg from "../assets/uploadImage.svg"
import { useState, useEffect } from "react"
import * as Switch from '@radix-ui/react-switch'
import { NavLink, useNavigate } from "react-router-dom"
import { upLoadImageToCloudinary } from "../utils/uploadImage.js"
import { sendPhotoToPlanetNet } from "../services/plantService.js"
import Loading from "../Components/Loading.jsx"
import arrowImg from '../assets/arrowBack.svg'
import loadingImg from '../assets/loadingLeaves.svg'
import sadPlant from '../assets/sadPlant.jpg'
import Button from '../Components/Button.jsx'

export default function NewPlant() {
    const { addPlant, capturedPhoto, setCapturedPhoto, openCamera } = usePlantStore()
    const [analizyng, setAnalyzing] = useState(false)
    const navigate = useNavigate()
    const [diagnosisError, setDiagnosisError] = useState(false)

    const [capturedPhotoData, setCapturedPhotoData] = useState(null)
    const [isDiagnosisAccepted, setIsDiagnosisAccepted] = useState(false)
    const [acqDate, setAcqDate] = useState(null)
    const [imageUrls, setImageUrls] = useState([])
    const [uploadingImg, setUploadingImg] = useState(false)
    const [sick, setSick] = useState(false)
    const [mistingRequired, setMistingRequired] = useState(false)
    const [fertilizationRequired, setFertilizationRequired] = useState(false)
    const [status, setStatus] = useState('idle')

    useEffect(() => {
        // document.querySelector("header").style.display = "none"
        return () => {
            setCapturedPhoto(null)
            console.log('Desmontado')
            // document.querySelector("header").style.display = "flex"
        }
    }, [])

    useEffect(() => {
        if (!capturedPhoto) return

        const analyze = async () => {
            setDiagnosisError(null)
            setAnalyzing(true)
            try {
                // Usa la función auxiliar
                const result = await sendPhotoToPlanetNet(capturedPhoto)
                setCapturedPhotoData(result)
            } catch (error) {
                console.error("Error identificando la planta:", error)
                setDiagnosisError(true)
            } finally {
                setAnalyzing(false)
            }
        }
        analyze()

    }, [capturedPhoto])

    useChangeTitle("Nueva Planta")

    const handleSaveImgs = async (selectedImgs) => {
        setUploadingImg(true)
        const filesArray = Array.from(selectedImgs);
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
            ...uploadedCloudinaryUrls
            ])
        setUploadingImg(false)
    }

    const navigateToNewPlant = () => {
        navigate("/newPlant")
        setCapturedPhoto(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('saving')
        // setUploading(true)
        var uploadedCloudinaryCapturedPhoto
        if (capturedPhoto) {
            setUploadingImg(true)
            const uploadPromise = upLoadImageToCloudinary(capturedPhoto)

            // Esperamos a que TODAS las promesas se resuelvan
            uploadedCloudinaryCapturedPhoto = await uploadPromise;

            setImageUrls((prevUrls) =>
                [...prevUrls,
                    uploadedCloudinaryCapturedPhoto
                ])
            setUploadingImg(false)
        }

        const data = new FormData(e.target)
        const newPlantData = Object.fromEntries(data.entries())

        const newPlant = {
            id: crypto.randomUUID(),
            name: newPlantData.name,
            location: newPlantData.location,
            imageUrls: [uploadedCloudinaryCapturedPhoto, ...imageUrls].filter(Boolean),
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
                frequencyDays: Number(newPlantData.wateringFrequencyDays) || 0,
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

        try {
            await addPlant(newPlant)
            setCapturedPhoto(null)
            navigate("/")
        } catch {
            setStatus('error')
        }
    }

    const scorePercent = capturedPhotoData ? Math.round(capturedPhotoData.score * 100) : null

    return (
        <>
            {capturedPhoto ? (analizyng ? (
                <Loading text="Analizando imagen..." img={loadingImg} />)
                :
                (<section className={`${isDiagnosisAccepted ? `hidden` : "justify-center items-center flex flex-col"}`}>
                    {diagnosisError ? (
                        <div className="justify-items-center content-center items-center h-[calc(100vh-60px)] grid gap-3">
                            <p>Imagen no reconocida</p>
                            <img src={sadPlant} className="aspect-square rounded-full shadow border-6 shrink-0 snap-center w-[30%] object-cover" alt="" />
                            <Button onClick={openCamera}>Probar de nuevo</Button>
                            <Button onClick={navigateToNewPlant}>Añadir datos manualmente</Button>
                        </div>
                    ) : (
                        <div className="justify-items-center content-center items-center  grid gap-3">
                            <img key="captured"
                                className="aspect-square rounded-lg shadow shrink-0 snap-center w-100 object-cover"
                                src={URL.createObjectURL(capturedPhoto)}
                                alt="Foto capturada"
                            />
                            <p>Nombre científico: {capturedPhotoData?.scientificName}</p>
                            <p>Nombres comunes: {capturedPhotoData?.commonNames?.[0]}</p>
                            <p>Coindicencia: {scorePercent}%</p>
                            <input className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accentStrong"
                                type="range"
                                id="progreso"
                                name="progreso"
                                min="0"
                                max="100"
                                value={scorePercent}
                                step="1"
                            />

                            <Button onClick={() => setIsDiagnosisAccepted(true)}>Aceptar</Button>
                            <Button onClick={openCamera}>Probar de nuevo</Button>
                        </div>
                    )}
                </section>
                )) : null}

            {(isDiagnosisAccepted || !capturedPhoto) &&
                <>
                    <header className="fixed z-3 flex pt-[5px] pb-[5px] pr-[15px] pl-[15px] justify-between items-center w-full bg-secondary shadow top-0">
                        <NavLink to='/' className="">
                            <img width="25px" height="25px" src={arrowImg} />
                        </NavLink>
                        <h1>Nueva planta</h1>

                    </header>
                    <form className="mt-[60px] p-5 flex flex-col gap-[10px] pb-[70px]" onSubmit={(e) => handleSubmit(e)} autoComplete="off">

                        <CustomInput text="Nombre" type="text" placeholder="Introduce el nombre" name="name" />
                        <CustomDatePicker name="acquisition" placeholderText="Fecha adquisición" required="true" text="Fecha adquisición" selected={acqDate} handleOnChange={(date) => setAcqDate(date)} />
                        <CustomInput text="Localización" type="text" placeholder="Introduce ubicación" name="location" />
                        <label className="pb-[10px] bg-white p-3 rounded-xl flex justify-between font-normal text-detail relative">
                            <span className="flex">Cargar imágenes</span>
                            <input multiple type="file" className="invisible !max-w-[40px] mr-[20px]" accept="image/*" onChange={(e) => handleSaveImgs(e.target.files)} />
                            <div className="w-[40px] h-[40px] bg-accentStrong rounded-full justify-center flex items-center right-[20px]"> <img src={imgUploadImg} /></div>
                        </label>
                        <div className="flex gap-2 p-[20px] overflow-x-auto snap-x snap-mandatory">
                            {imageUrls?.map((url, i) => (
                                <img key={i} className="aspect-square rounded-lg shadow shrink-0 snap-center w-[30%] object-cover" src={url} alt={`Foto ${i + 1} de ${name}`} />
                            ))}

                            {capturedPhoto && (
                                <img
                                    key="captured"
                                    className="aspect-square rounded-lg shadow shrink-0 snap-center w-[30%] object-cover"
                                    src={URL.createObjectURL(capturedPhoto)}
                                    alt="Foto capturada"
                                />
                            )}
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

                        <button disabled={(status === 'saving') || uploadingImg} className="bg-accentStrong w-[170px] shadow p-2 rounded-full font-medium self-center disabled:opacity-50 text-black" type="submit">
                            {uploadingImg
                                ? 'Cargando imagen...'
                                : status === 'saving'
                                    ? 'Guardando...'
                                    : status === 'error'
                                        ? 'Error, inténtalo de nuevo'
                                        : 'Guardar planta'
                            }            </button>
                        {status === 'error' && (
                            <p className="text-red-500 text-center">Error al guardar. Comprueba tu conexión y vuelve a intentarlo.</p>
                        )}
                    </form>
                </>}
        </>

    )
}