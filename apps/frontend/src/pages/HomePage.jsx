// import plants from '../data/plants.json'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useChangeTitle } from '../hooks/setPageTitle.jsx'
import { usePlantStore } from '../store/usePlantStore.js'
import imgSick from '../assets/sick.svg'
import imgDrop from '../assets/drop.svg'
import imgPlus from '../assets/plus.svg'
import imgPlant from '../assets/plant.svg'
import * as Switch from '@radix-ui/react-switch'

export default function HomePage() {
    const { plants, loading, fetchPlants } = usePlantStore()
    // const plants = usePlantStore((state) => state.plants)

    useEffect(() => {
        fetchPlants()
    }, [])


    const locationListSet = [...new Set(plants.map(plant => plant.location))]
    const [locationFilter, setLocationFilter] = useState("0")
    const [searchText, setSearchText] = useState("")
    const [showSick, setShowSick] = useState(false)

    const handleLocationFilter = (e) => {
        setLocationFilter(e.target.value)
    }

    useChangeTitle("Home")

    const handleInputChange = (e) => {
        setSearchText(e.target.value)
    }
    if (loading) return <p>Cargando plantas...</p>

    const filteredPlants = plants.filter(p => (p.location === locationFilter || locationFilter === "0") && p.name?.toLowerCase().includes(searchText.toLowerCase()) && (showSick ? p.sick : true))
    console.log(filteredPlants)
    const today = new Date()

    return (
        <>
            <section className="p-[20px] flex flex-col gap-[15px] pb-[90px]">
                <h1>Mis plantas</h1>
                <input onChange={handleInputChange} placeholder="Buscar..." className="bg-red-100 rounded-sm p-[5px]" type="search"></input>
                <div className="bg-secondary rounded-md">
                    <h2>Filtros</h2>
                    <select onChange={handleLocationFilter} value={locationFilter}>
                        <option value="0">Todas</option>
                        {locationListSet.map((location) => {
                            return (
                                <option value={location}>{location}</option>
                            )
                        })}
                    </select>
                    <div className="flex justify-between p-3">
                        <p>Enferma:</p>
                        <Switch.Root checked={showSick} onCheckedChange={() => setShowSick(!showSick)} className="w-11 h-6 bg-gray-300 data-[state=checked]:bg-accentStrong rounded-full relative transition-colors duration-200 ease-in-out outline-none cursor-pointer">
                            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                        </Switch.Root>
                    </div>
                </div>
                <NavLink to="/newplant" className="fixed bottom-[65px] right-[20px] z-[10] w-12 h-12 flex items-center justify-center bg-accentStrong rounded-full text-white shadow-lg"><img src={imgPlus} alt="" width="30px" /></NavLink>
                <div className=" grid grid-cols-3 gap-3">
                    {/* HACER FILTRADO PREVIO */}
                    {filteredPlants.length > 0 ?

                        filteredPlants.map((plant) => {
                            const daysFromLastWater = plant.watering.waterRecord.length > 0 ? (Math.abs(today - new Date(plant.watering.waterRecord[plant.watering.waterRecord.length - 1])) / 86400000) : null
                            const needsToWater = daysFromLastWater != null ? daysFromLastWater > plant.watering.frequencyDays : true

                            return (
                                <article key={plant.id} className="relative">
                                    {plant.imageUrls?.length > 0 ?
                                        <NavLink to={`/plantdetails/${plant.id}`}>
                                            <img className="aspect-square object-cover rounded-md" src={plant.imageUrls[0]} alt={plant.name} />
                                        </NavLink>
                                        :
                                        <NavLink className="" to={`/plantdetails/${plant.id}`}>
                                            <img src={imgPlant} alt={plant.name} className="aspect-square object-cover rounded-md" />
                                        </NavLink>}
                                    <h2>{plant.name}</h2>
                                    {plant.sick ? <img className="absolute bottom-[45px] right-[-7px]" src={imgSick} width="25" height="25" /> : ""}
                                    {needsToWater ? <img className="absolute top-[-5px] right-[-7px]" src={imgDrop} width="25" height="25" /> : ""}
                                </article>
                            )
                        })
                        :
                        <p className="col-span-3">No hay plantas con estos criterios</p>}
                </div>
            </section>
        </>
    )
}