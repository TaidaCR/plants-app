import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import * as Switch from '@radix-ui/react-switch'
import { useChangeTitle } from '../hooks/setPageTitle.jsx'
import { usePlantStore } from '../store/usePlantStore.js'
import ActionPanel from '../Components/ActionPanel.jsx'
import Button from '../Components/Button.jsx'
import InfoPill from '../Components/InfoPill.jsx'
import editImg from '../assets/edit.svg'
import arrowImg from '../assets/arrowBack.svg'
import trashImg from '../assets/trash.svg'
import plusImg from '../assets/plus.svg'
import loadingImg from '../assets/loading.svg'
import { upLoadImageToCloudinary } from "../utils/uploadImage.js"
import {getDaysDifference} from '../utils/calculationTools.js'

export default function PlantDetails() {
    //ORDEN 1: Hooks y estados
    const { updatePlant, deleteComment, deletePlant, fetchPlants, plants } = usePlantStore()
    const navigate = useNavigate()
    const { id } = useParams()

    const [uploadingImg, setUploadingImg] = useState(false)
    const [imgState, setImgState] = useState('close')
    const [showAll, setShowAll] = useState(false)
    const [newComment, setNewComment] = useState(false)
    const [newCommentText, setNewCommentText] = useState("")

    //ORDEN 2: Effects
    useEffect(() => {
            fetchPlants()
    }, [])

    useEffect(() => {
        imgState === 'open' ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [imgState])

    const plant = plants.find(plant => plant.id === id)
    useChangeTitle(`Detalles de ${plant?.name}`)
    if (!plant) return <div>La planta no existe</div>

    //ORDEN 3: Derivados
    const today = new Date()
    const todayISO = today.toISOString().split('T')[0]
    const commentsToShow = ((plant.comments?.length > 3 && showAll) || plant.comments?.lenght < 3) ? plant.comments : plant.comments?.slice(-3)
    const plantAcq = new Date(plant.acquisition).toLocaleDateString('es-ES')
    const lastWater = plant.watering.waterRecord?.length > 0 ? plant.watering.waterRecord[plant.watering.waterRecord.length - 1].split('T')[0] : null
    const lastFertilizer = plant.fertilization.fertilizerRecord?.length > 0 ? plant.fertilization.fertilizerRecord[plant.fertilization.fertilizerRecord.length - 1].split('T')[0] : null
    const lastTreatment = plant.treatment.treatmentRecord?.length > 0 ? plant.treatment.treatmentRecord[plant.treatment.treatmentRecord.length - 1].split('T')[0] : null
    const lastWateredInDays = lastWater ? Math.floor(getDaysDifference(lastWater)) : null
    const lastFertilizedInDays = lastFertilizer ? Math.floor(getDaysDifference(lastFertilizer)) : null
    const lastTreatedInDays = lastTreatment ? Math.floor(getDaysDifference(lastTreatment)) : null

    //ORDEN 4: Handlers
    const handleToggleSick = (checked) => {
        const updatedPlant = {
            ...plant,
            sick: checked
        }
        updatePlant(updatedPlant)
    }

    const handleToggleMisting = (checked) => {
        const updatedPlant = {
            ...plant,
            misting: {
                ...plant.misting,
                required: checked
            }
        }

        updatePlant(updatedPlant)
    }

    const handleToggleFertilization = (checked) => {
        const updatedPlant = {
            ...plant,
            fertilization: {
                ...plant.fertilization,
                required: checked
            }
        }

        updatePlant(updatedPlant)
    }

    const handleNewComment = (e, text) => {
        e.preventDefault();
        const plantWithNewComment = {
            ...plant,
            comments: [
                ...plant.comments,
                {
                    id: crypto.randomUUID(),
                    date: new Date().toISOString(),
                    text: text
                }
            ]
        }

        setNewCommentText("")
        setNewComment(false)
        updatePlant(plantWithNewComment)
    }

    const handleSaveImg = async (img) => {
        setUploadingImg(true)
        let uploadedCloudinaryUrl = null;
        if (img) {
            uploadedCloudinaryUrl = await upLoadImageToCloudinary(img);
        }
        const plantWithNewImg = {
            ...plant,
            imageUrls:
                uploadedCloudinaryUrl ? [...plant.imageUrls, uploadedCloudinaryUrl]
                    : plant.imageUrls
        }

        updatePlant(plantWithNewImg)
        setUploadingImg(false)
        console.log("imagen subida")
    }

    const handleDeletePlant = (plant) => {
        deletePlant(plant, plant.id)
        console.log("Planta eliminada")
        navigate("/")
    }

    //SIMULAR TIMEOUT COMO SI COGIERA DE API Y CARGANDO
    return (
        <main className="pb-[140px] pt-[70px]">
            {/* BARRA SUPERIOR ATRAS/NOMBRE/EDITAR */}
            <header className="fixed z-3 flex pt-[5px] pb-[5px] pr-[15px] pl-[15px] justify-between items-center w-full bg-secondary shadow top-0">
                <NavLink to='/' className="">
                    <img width="25px" height="25px" src={arrowImg} />
                </NavLink>
                <h1 className="flex"> {plant.name}</h1>
                <NavLink to={`/editplant/${id}`} className="rounded-full p-[10px] h-fit bg-accentStrong">
                    <img width="25px" height="25px" src={editImg} />
                </NavLink>
            </header>

            {/* IMÁGENES */}
            <div className={imgState === 'close' ? `flex gap-2 p-[20px] overflow-x-auto snap-x snap-mandatory` : `top-[0] left-[0] w-full h-screen overflow-x-auto scroll-smooth snap-x snap-mandatory gap-2 bg-[#000000cc] absolute z-[1000] flex`}>
                <div className={imgState === 'close' ? `aspect-square rounded-lg shrink-0 snap-center relative w-[30%]` : `hidden`}>
                    <div className="aspect-square rounded-lg shrink-0 span-center justify-center align-center flex">
                        {
                            uploadingImg ?
                                <img src={loadingImg} className="animate-spin loading-img" width="40px" height="40px" />
                                :
                                <img src={plusImg} width="40px" height="40px" />
                        }
                    </div>
                    <input className="absolute w-full h-full top-0 left-0 opacity-0" type="file" accept="image/*" onChange={(e) => handleSaveImg(e.target.files[0])} />
                </div>
                <button className={imgState === 'close' ? `hidden` : `flex rounded-full p-[10px] h-fit bg-accentStrong fixed top-3.5 right-3.5`} onClick={() => setImgState('close')}>
                    <img width="25px" height="25px" src={plusImg} className="rotate-45" />
                </button>
                {plant.imageUrls?.map((url, i) => (
                    <button onClick={() => setImgState('open')} className={imgState === 'close' ? `size-fit aspect-square rounded-lg shadow shrink-0 snap-center w-[30%] object-cover` : `w-full h-full flex-shrink-0 snap-center p-4`}>
                        <img key={i} className="aspect-square rounded-lg shadow shrink-0 snap-center object-cover" src={url} alt={`Foto ${i + 1} de ${plant.name}`} />
                    </button>
                ))}

            </div>

            {/* FICHA TECNICA */}
            <section className="p-[20px] bg-[#f2f4f2] m-3 rounded-4xl text-left gap-[10px] flex flex-col">
                <h2 className="uppercase text-dark">Info general</h2>
                <InfoPill text="Fecha de compra" value={plantAcq} />
                <InfoPill text="Localización" value={plant.location} />
                <h2 className="uppercase text-dark">Riego</h2>
                <InfoPill text="Frecuencia de riego:" value={plant.watering.frequencyDays} />
                <InfoPill text="Último riego:" value={lastWater ? (lastWater === todayISO ? "Hoy" : `Hace ${lastWateredInDays} días`) : "Sin riegos"} />

                <h2 className="uppercase text-dark">Fertilización</h2>
                <div className="pb-[10px] bg-white rounded-xl flex flex-col justify-between font-normal text-detail">
                    <div className="flex justify-between p-3">
                        <p>¿Requiere fertilización?:</p>
                        <Switch.Root checked={plant.fertilization.required} onCheckedChange={handleToggleFertilization} className="w-11 h-6 bg-gray-300 data-[state=checked]:bg-accentStrong rounded-full relative transition-colors duration-200 ease-in-out outline-none cursor-pointer">
                            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                        </Switch.Root>
                    </div>
                    {plant.fertilization.required ?
                        <>
                            <InfoPill text="Frecuencia de fertilización:" value={plant.fertilization.frequencyDays} />
                            <InfoPill text="Última fertilización:" value={lastFertilizer ? (lastFertilizer === todayISO ? "Hoy" : `Hace ${lastFertilizedInDays} días`) : "Sin fertilizar"} />
                            <p className="pb-[10px] bg-white p-3 rounded-xl flex justify-between font-normal text-detail">{plant.fertilization.fertilizationInfo}</p>
                        </>
                        : ""
                    }
                </div>


                <h2 className="uppercase text-dark">Tratamientos</h2>
                <div className="pb-[10px] bg-white rounded-xl flex flex-col justify-between font-normal text-detail">
                    <div className="flex justify-between p-3">
                        <p>Enferma:</p>
                        <Switch.Root checked={plant?.sick ?? false} onCheckedChange={(checked) => handleToggleSick(checked)} className="w-11 h-6 bg-gray-300 data-[state=checked]:bg-accentStrong rounded-full relative transition-colors duration-200 ease-in-out outline-none cursor-pointer">
                            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                        </Switch.Root>
                    </div>
                    {plant?.sick ?
                        <>
                            <InfoPill text="Frecuencia de tratamiento:" value={plant?.treatment?.frequencyDays} />
                            <InfoPill text="Último tratamiento:" value={lastTreatment ? (lastTreatment === todayISO ? "Hoy" : `Hace ${lastTreatedInDays} días`) : "Sin tratamiento"} />
                            <p className="pb-[10px] bg-white p-3 rounded-xl flex justify-between font-normal text-detail">{plant?.treatment?.treatmentInfo}</p>
                        </>
                        : ""
                    }
                </div>

                <h2 className="uppercase text-dark">Pulverización</h2>
                <div className="pb-[10px] bg-white rounded-xl flex flex-col justify-between font-normal text-detail">
                    <div className="flex justify-between p-3">
                        <p>¿Requiere pulverización?:</p>
                        <Switch.Root checked={plant.misting.required} onCheckedChange={handleToggleMisting} className="w-11 h-6 bg-gray-300 data-[state=checked]:bg-accentStrong rounded-full relative transition-colors duration-200 ease-in-out outline-none cursor-pointer">
                            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                        </Switch.Root>
                    </div>
                    {plant.misting.required ?
                        <InfoPill text="Frecuencia de pulverización:" value={plant.misting.frequencyDays} />
                        : ""
                    }
                </div>
            </section>

            {/* COMENTARIOS */}
            <section className="flex flex-col gap-[15px] p-[20px] m-3 bg-[#f2f4f2] rounded-4xl">
                <h2 className="uppercase text-dark">Descripción e info</h2>
                <p>
                    {plant.notes}
                </p>
            </section>

            {/* HISTORIAL */}
            <section className="relative flex flex-col gap-[15px] p-[20px] m-3 bg-secondary border-1 border-dark rounded-4xl items-center">
                <h2 className="uppercase text-dark">Historial<button className="absolute rounded-full p-[10px] w-[45px] h-[45px] h-fit bg-accentStrong top-[10px] right-[10px]" onClick={() => setNewComment(!newComment)}><img src={plusImg} alt="" /></button></h2>
                {
                    newComment ?
                        <form className="p-4">
                            <label className="flex flex-col justify-between gap-3">
                                <span>Nuevo comentario</span>
                                <textarea className="bg-white grow p-3 border-2 border-[#dbdbdb] rounded-[5px]" rows="6" onChange={(e) => setNewCommentText(e.target.value)} value={newCommentText}></textarea>
                            </label>
                            <button className="bg-primary p-3 rounded-full mt-[10px]" type="submit" onClick={(e) => handleNewComment(e, newCommentText)}>Guardar</button>
                        </form>
                        :
                        <></>
                }
                {commentsToShow?.length > 0 ?
                    commentsToShow.reverse().map((comment) => {
                        return (
                            <article key={comment.id} className="m-[15px] pl-[7px] text-left flex flex-col gap-[7px] border-l border-dark w-full">
                                <p>{comment.text}</p>

                                <span className="flex justify-between w-full p-1 rounded-lg w-fit font-bold">{comment.date.split('T')[0]}<button onClick={() => deleteComment(plant.id, comment.id)}> <img width="40" height="40" className="rounded-full p-[9px] bg-primary" src={trashImg} /> </button></span>
                            </article>
                        )
                    })

                    : <p>No hay comentarios</p>
                }
                {plant.comments?.length > 3 ?
                    <button className="shadow bg-accentStrong text-black p-3 w-[200px] rounded-xl" onClick={() => setShowAll(!showAll)}>{showAll ? "Ver menos" : "Ver todos"}</button>
                    :
                    ""
                }
            </section>
            {/* ACCIONES */}
            <section className="justify-center flex">
                <Button handleClick={() => handleDeletePlant(plant)} imgClass="bg-red-500" imgUrl={trashImg} addedClass="bg-red-500 p-0 text-white bottom-[65px] left-[20px]" />
                <ActionPanel plant={plant} />
            </section>
        </main>
    )
}