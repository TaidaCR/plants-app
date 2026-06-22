import Button from '../Components/Button.jsx'
// import {useState} from 'react'
import {usePlantStore} from '../store/usePlantStore.js'

export default function ActionPanel({plantId}) {
    
    //Lo traemos aquí para que no renderice todo plantDetails cada vez que pulsamos un botón
    const {waterPlant, fertilizePlant} = usePlantStore()

    const plant = usePlantStore((state) => state.plants.find((p) => p.id === plantId))

    const lastWater = plant.waterRecord[plant.waterRecord.length - 1]
    const lastFertilizer = plant.fertilizerRecord[plant.fertilizerRecord.length - 1]

    return(
        <>
            <div>
                <p className="pb-[10px]">Último riego: {lastWater}</p>
                <p className="pb-[10px]">Último riego: {lastFertilizer}</p>
            </div>
                <Button handleClick={() => waterPlant(plantId)} text="Regar"/>
                <Button handleClick={() => fertilizePlant(plantId)} text="Fertilizar"/>
        </>
    )
}