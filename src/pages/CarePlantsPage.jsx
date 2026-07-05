import { usePlantStore } from "../store/usePlantStore"
import {useState, useEffect} from 'react'
import sprayImg from '../assets/spray.svg'
import pillImg from '../assets/pill.svg'
import dropImg from '../assets/drop.svg'
import imgPlant from '../assets/plant.svg'

export default function CarePlantsPage() {
    const {plants, fetchPlants} = usePlantStore()
    const {waterPlant, fertilizePlant, treatPlant} = usePlantStore()
    const [functionality, setFunctionality] = useState('waterPlant')
    
    useEffect(() =>{
        fetchPlants()
    }, [])

    const getDaysDifference = (lastDayValue) =>{

        const today = new Date()
        const lastDay = new Date(lastDayValue)

        today.setHours(0,0,0,0)
        lastDay.setHours(0,0,0,0)

        const difference = today.getTime() - lastDay.getTime()
        const differenceInDays = Math.floor(difference / (1000*60*60*24))

        return differenceInDays
    }

    const plantCareNeeds = (freqDays, record) =>{
            if(record.length > 0){
                const daysFromLastCare = getDaysDifference(record[record.length - 1])
                if(daysFromLastCare > freqDays){
                    return true
                }else{
                    return false
                }
            } else{
                return true
            }
    }
                                                     
    const needsWater = plants.filter((p) => plantCareNeeds(p.watering.frequencyDays, p.watering.waterRecord)  )
    const needsTreatment = plants.filter((p) => p.sick && plantCareNeeds(p.treatment.frequencyDays, p.treatment.treatmentRecord))                                                                        
    const needsFertilize = plants.filter((p) => p.fertilization.required && p.fertilization.required && plantCareNeeds(p.fertilization.frequencyDays, p.fertilization.fertilizerRecord))
    
    const plantsToCare = functionality === 'waterPlant' ? needsWater : (functionality === 'treatPlant' ? needsTreatment : needsFertilize)
    
    return(
        <>
        <section className="p-[20px]">
            <h1>Cuidados</h1>
            <div className="grid grid-cols-4 gap-3">
                {plantsToCare.length === 0 ? 
                    <p className="col-span-4">No hay plantas que {functionality === 'waterPlant' ? <span>regar</span> : functionality === 'treatPlant' ?  <span>tratar</span> : <span>fertilizar</span>}</p>
                    :
                plantsToCare.map((plant) => {
                            return(
                            <button onClick={functionality === 'waterPlant' ? () => waterPlant(plant.id) : (functionality === 'fertilizePlant' ? () => fertilizePlant(plant.id) : () => treatPlant(plant.id))}>
                                <img className="aspect-square rounded-lg shadow shrink-0 w-[90%] snap-center" src={plant.imageUrls.length > 0 ? plant.imageUrls[0] : imgPlant}></img>
                                <h2>{plant.name}</h2>
                            </button>
                            )
                })}
            </div>
            <div className="shadow-md fixed bottom-[65px] actions-section bg-white rounded justify-self-center rounded-md col-span-3 justify-around flex gap-[10px] p-[10px] w-fit">
                <input className="sr-only peer/water" id="option-water" onChange={() => setFunctionality('waterPlant')} type="radio" name="functionality" checked={functionality === 'waterPlant'}></input>
                <label htmlFor="option-water" className="block peer-checked/water:bg-primary text-xs"><img src={dropImg} className="w-[48px]" alt=""/><p>Regar</p></label>
    
                <input className="sr-only peer/treat" id="option-treat" onChange={() => setFunctionality('treatPlant')} type="radio" name="functionality" checked={functionality === 'treatPlant'}></input>
                <label htmlFor="option-treat" className="block peer-checked/treat:bg-primary text-xs"><img src={pillImg}  className="w-[48px]" alt=""/><p>Tratar</p></label>
        
                <input className="sr-only peer/fertilize" id="option-fertilize" onChange={() => setFunctionality('fertilizePlant')} type="radio" name="functionality" checked={functionality === 'fertilizePlant'}></input>
                <label htmlFor="option-fertilize" className="block peer-checked/fertilize:bg-primary text-xs"><img src={sprayImg}  className="w-[48px]" alt=""/><p>Fertilizar</p></label>
                
            </div> 
        </section>
        </>
    )
}