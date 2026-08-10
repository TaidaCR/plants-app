import { useState, useEffect } from 'react'
import { usePlantStore } from "../store/usePlantStore"
// import sprayImg from '../assets/spray.svg'
import pillImg from '../assets/pill.svg'
import sparklesImg from '../assets/sparkles.svg'
import dropImg from '../assets/drop.svg'
import imgPlant from '../assets/plant.svg'
import { getDaysDifference, plantCareNeeds } from '../utils/calculationTools.js'

export default function CarePlantsPage() {
    const { plants, fetchPlants } = usePlantStore()
    const { waterPlant, fertilizePlant, treatPlant } = usePlantStore()
    const [functionality, setFunctionality] = useState('waterPlant')

    useEffect(() => {
        fetchPlants()
    }, [])

    const today = new Date()
    const todayISO = today.toISOString()

    const needsWater = plants.filter((p) => plantCareNeeds(p.watering.frequencyDays, p.watering.waterRecord))
    const needsTreatment = plants.filter((p) => p.sick && plantCareNeeds(p.treatment.frequencyDays, p.treatment.treatmentRecord))
    const needsFertilize = plants.filter((p) => p.fertilization.required && plantCareNeeds(p.fertilization.frequencyDays, p.fertilization.fertilizerRecord))

    const plantsToCare = functionality === 'waterPlant' ? needsWater : (functionality === 'treatPlant' ? needsTreatment : needsFertilize)

    //PRUEBAS
    const lastWatered = plants.filter((p) => {
        const lastRecord = p?.watering?.waterRecord[p.watering.waterRecord.length - 1]
        console.log("lastRecord: ", p.name, lastRecord)
        return lastRecord && getDaysDifference(lastRecord) <= 1;
    })
    const lastFertilized = plants.filter((p) => p?.fertilization?.fertilizerRecord[p.fertilization.fertilizerRecord.length - 1]?.split('T')[0] === todayISO.split('T')[0])
    const lastTreated = plants.filter((p) => p?.treatment?.treatmentRecord[p.treatment.treatmentRecord.length - 1]?.split('T')[0] === todayISO.split('T')[0])

    const lastActionsPlants = functionality === 'waterPlant' ? lastWatered : (functionality === 'treatPlant' ? lastTreated : lastFertilized)
    const lastActionsPlantsSorted = lastActionsPlants.sort((a, b) => {
        const lastActionA = functionality === 'waterPlant' ? a.watering.waterRecord[a.watering.waterRecord.length - 1] : (functionality === 'treatPlant' ? a.treatment.treatmentRecord[a.treatment.treatmentRecord.length - 1] : a.fertilization.fertilizerRecord[a.fertilization.fertilizerRecord.length - 1])
        const lastActionB = functionality === 'waterPlant' ? b.watering.waterRecord[b.watering.waterRecord.length - 1] : (functionality === 'treatPlant' ? b.treatment.treatmentRecord[b.treatment.treatmentRecord.length - 1] : b.fertilization.fertilizerRecord[b.fertilization.fertilizerRecord.length - 1])
        return new Date(lastActionB) - new Date(lastActionA)
    })

    return (
        <>
            <section className="p-[20px] pb-[120px]">
                <h1>Cuidados</h1>
                <div className="grid grid-cols-4 gap-3 items-start">
                    {plantsToCare.length === 0 ?
                        <p className="col-span-4">No hay plantas que {functionality === 'waterPlant' ? <span>regar</span> : functionality === 'treatPlant' ? <span>tratar</span> : <span>fertilizar</span>}</p>
                        :
                        plantsToCare.map((plant) => {
                            return (
                                <button onClick={functionality === 'waterPlant' ? () => waterPlant(plant.id) : (functionality === 'fertilizePlant' ? () => fertilizePlant(plant.id) : () => treatPlant(plant.id))}>
                                    <img className="aspect-square rounded-lg shadow shrink-0 w-[90%] snap-center" src={plant.imageUrls.length > 0 ? plant.imageUrls[0] : imgPlant}></img>
                                    <h2>{plant.name}</h2>
                                </button>
                            )
                        })}
                </div>
                <div className="grid grid-cols-4 gap-3 items-start border-top border-t opacity-[0.5] pt-4">
                    <p className="col-span-4"> {functionality === 'waterPlant' ? <span>Regadas recientemente</span> : functionality === 'treatPlant' ? <span>Tratadas recientemente</span> : <span>Fertilizadas recientemente</span>}</p>
                    {lastActionsPlants.length === 0 ?
                        <p className="col-span-4">No hay plantas {functionality === 'waterPlant' ? <span>regadas recientemente</span> : functionality === 'treatPlant' ? <span>tratadas recientemente</span> : <span>fertilizadas recientemente</span>}</p>
                        :
                        lastActionsPlantsSorted.map((plant) => {
                            return (
                                <button>
                                    <img className="aspect-square rounded-lg shadow shrink-0 w-[90%] snap-center" src={plant.imageUrls.length > 0 ? plant.imageUrls[0] : imgPlant}></img>
                                    <h2>{plant.name}</h2>
                                </button>
                            )
                        })}
                </div>
                <div className="shadow-md fixed bottom-[65px] actions-section bg-white rounded justify-self-center rounded-md col-span-3 justify-around flex gap-[10px] p-[10px] w-fit">
                    <input className="sr-only peer/water" id="option-water" onChange={() => setFunctionality('waterPlant')} type="radio" name="functionality" checked={functionality === 'waterPlant'}></input>
                    <label htmlFor="option-water" className="block peer-checked/water:bg-primary text-xs"><img src={dropImg} className="w-[30px]" alt="" /><p>Regar</p></label>

                    <input className="sr-only peer/treat" id="option-treat" onChange={() => setFunctionality('treatPlant')} type="radio" name="functionality" checked={functionality === 'treatPlant'}></input>
                    <label htmlFor="option-treat" className="block peer-checked/treat:bg-primary text-xs"><img src={pillImg} className="w-[30px]" alt="" /><p>Tratar</p></label>

                    <input className="sr-only peer/fertilize" id="option-fertilize" onChange={() => setFunctionality('fertilizePlant')} type="radio" name="functionality" checked={functionality === 'fertilizePlant'}></input>
                    <label htmlFor="option-fertilize" className="block peer-checked/fertilize:bg-primary text-xs"><img src={sparklesImg} className="w-[30px]" alt="" /><p>Fertilizar</p></label>

                </div>
            </section>
        </>
    )
}
