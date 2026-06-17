import plants from '../data/plants.json'
import { NavLink } from 'react-router-dom'
import {useState} from 'react'
export default function HomePage() {

    const locationListSet = [...new Set(plants.map(plant => plant.location))]
    const [locationFilter, setLocationFilter] = useState("0")

    const handleLocationFilter = (e) => {
        setLocationFilter(e.target.value)
    }

    return(
       <>
       <section className="p-[20px]">
        <h1>Mis plantas</h1>
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
            {plants.map((plant) => {
                return(
                    <article key={plant.id} className={plant.location === locationFilter || locationFilter === "0" ? 'block' : 'hidden'} >
                        <NavLink to={`/plantdetails/${plant.id}`}>
                            <img className="aspect-square object-cover rounded-md" src={plant.imageUrl}/>
                        </NavLink>
                        <h2>{plant.name}</h2>
                    </article>
                )
            })}
        </div>
       </section>
       </>
    )
}