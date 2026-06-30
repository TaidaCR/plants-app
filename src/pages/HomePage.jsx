// import plants from '../data/plants.json'
import { NavLink } from 'react-router-dom'
import {useState} from 'react'
import {useChangeTitle} from '../hooks/setPageTitle.jsx'
import { usePlantStore } from '../store/usePlantStore.js'
import imgSick from '../assets/sick.svg'
import imgDrop from '../assets/drop.svg'

export default function HomePage() {
    const plants = usePlantStore((state) => state.plants)

    const locationListSet = [...new Set(plants.map(plant => plant.location))]
    const [locationFilter, setLocationFilter] = useState("0")
    const [searchText, setSearchText] = useState("")

    const handleLocationFilter = (e) => {
        setLocationFilter(e.target.value)
    }

    useChangeTitle("Home")    

    const handleInputChange = (e) => {
        setSearchText(e.target.value)
    }

    const filteredPlants = plants.filter(p => (p.location === locationFilter || locationFilter === "0") && p.name.toLowerCase().includes(searchText.toLowerCase()))
    const today = new Date()

    return(
       <>
       <section className="p-[20px] flex flex-col gap-[15px]">
        <h1>Mis plantas</h1>
        <input onChange={handleInputChange} placeholder="Buscar..." className="bg-red-100 rounded-sm p-[5px]" type="search"></input> 
        <div className="bg-blue-100">
            <h2>Filtros</h2>
            <select onChange={handleLocationFilter} value={locationFilter}>
                <option value="0">Todas</option>
            {locationListSet.map((location) => {
                return(
                    <option value={location}>{location}</option>
                )
            })}
            </select>
        </div>
        <div className=" grid grid-cols-3 gap-3">
            {/* HACER FILTRADO PREVIO */}
            {filteredPlants.map((plant) => {
                const daysFromLastWater = plant.watering.waterRecord.length > 0 ? (Math.abs(today - new Date(plant.watering.waterRecord[plant.watering.waterRecord.length - 1])) /86400000) : null
                const needsToWater = daysFromLastWater != null ? daysFromLastWater > plant.watering.frequencyDays : true

                return(
                    <article key={plant.id} className="relative">
                        <NavLink to={`/plantdetails/${plant.id}`}>
                            <img className="aspect-square object-cover rounded-md" src={plant.imageUrls[0]} alt={plant.name}/>
                        </NavLink>
                        <h2>{plant.name}</h2>
                        {plant.sick ? <img className="absolute bottom-[45px] right-[-7px]" src={imgSick} width="25" height="25"/>  : ""}
                        {needsToWater ? <img className="absolute top-[-5px] right-[-7px]" src={imgDrop} width="25" height="25"/> : ""}
                    </article>
                )
            })}
        </div>
       </section>
       </>
    )
}