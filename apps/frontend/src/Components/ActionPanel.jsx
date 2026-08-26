import Button from '../Components/ActionPanelButton.jsx'
// import {useState} from 'react'
import {usePlantStore} from '../store/usePlantStore.js'
import sprayImg from '../assets/spray.svg'
import pillImg from '../assets/pill.svg'
import dropImg from '../assets/drop.svg'

export default function ActionPanel({plant, lastWateredInDays, lastFertilizedInDays, lastTreatedInDays}) {
    //Lo traemos aquí para que no renderice todo plantDetails cada vez que pulsamos un botón
    const {waterPlant, fertilizePlant, treatPlant} = usePlantStore()

    return(
        <>
            <div className="shadow-md fixed bottom-[65px] actions-section bg-white rounded rounded-md col-span-3 justify-around flex gap-[10px] pr-[20px] pl-[20px]">
                <Button imgClass="group-disabled:bg-disabled group-disabled:opacity-50" type="button" disabled={lastWateredInDays === 0} imgUrl={dropImg} handleClick={() => waterPlant(plant.id)} text="Regar"/>
                <Button imgClass="group-disabled:bg-disabled group-disabled:opacity-50" type="button" disabled={lastFertilizedInDays === 0} addedClass={`${plant.fertilization.required ? "" : "hidden"}`} imgUrl={sprayImg} handleClick={() => fertilizePlant(plant.id)} text="Fertilizar"/>
                <Button imgClass="group-disabled:bg-disabled group-disabled:opacity-50" type="button" disabled={lastTreatedInDays === 0} addedClass={`${plant.sick ? "" : "hidden"}`} imgUrl={pillImg} handleClick={() => treatPlant(plant.id)} text="Tratar"/>
            </div>
        </>
    )
}