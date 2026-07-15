import Button from '../Components/Button.jsx'
// import {useState} from 'react'
import {usePlantStore} from '../store/usePlantStore.js'
import sprayImg from '../assets/spray.svg'
import pillImg from '../assets/pill.svg'
import dropImg from '../assets/drop.svg'

export default function ActionPanel({plant}) {
    //Lo traemos aquí para que no renderice todo plantDetails cada vez que pulsamos un botón
    const {waterPlant, fertilizePlant, treatPlant} = usePlantStore()

    return(
        <>
            <div className="shadow-md fixed bottom-[65px] actions-section bg-white rounded rounded-md col-span-3 justify-around flex gap-[10px] pr-[20px] pl-[20px]">
                <Button imgUrl={dropImg} handleClick={() => waterPlant(plant.id)} text="Regar"/>
                <Button addedClass={`${plant.fertilization.required ? "" : "hidden"}`} imgUrl={sprayImg} handleClick={() => fertilizePlant(plant.id)} text="Fertilizar"/>
                <Button addedClass={`${plant.sick ? "" : "hidden"}`} imgUrl={pillImg} handleClick={() => treatPlant(plant.id)} text="Tratar"/>
            </div>
        </>
    )
}