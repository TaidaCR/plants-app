import { useParams } from 'react-router-dom'
// import plants from '../data/plants.json'
import { NavLink } from 'react-router-dom'
import { useChangeTitle } from '../hooks/setPageTitle.jsx'
import ActionPanel from '../Components/ActionPanel.jsx'
import { usePlantStore } from '../store/usePlantStore.js'

export default function PlantDetails(){

    const {id} = useParams()
    const plant = usePlantStore((state) => state.plants.find((p) => p.id === id))

    useChangeTitle(`Detalles de ${plant.name}`)   

    const plantAcq = new Date(plant.acquisition).toLocaleDateString('es-ES')

    if (!plant){
        return <div>La planta no existe</div>
    }

    //SIMULAR TIMEOUT COMO SI COGIERA DE API Y CARGANDO

    return(
        <main>
        <section className="grid grid-cols-2 p-[20px]">
            <div className="p-[20px] relative">
                <h1>{plant.name}</h1>
                <img className="aspect-square" src={plant.imageUrl} alt={`Foto de ${plant.name}`}/>
                <NavLink to={`/editplant/${id}`} className="absolute rounded-full bottom-[3px] right-[3px] pt-[20px] pb-[20px] pr-[10px] pl-[10px] bg-green-500">
                    Editar
                </NavLink>
            </div>
            <div className="p-[20px]">
                <p  className="pb-[10px]">Fecha de compra: {plantAcq}</p>
            </div>
            <div className="col-span-3 justify-around flex mt-[20px]">
                {/* Componetizado para que sólo renderice esto y no todo plantDetails */}
                <ActionPanel plantId={plant.id} plantWaterRecord={plant.waterRecord}/>
            </div>
        </section>
        <section className="p-[20px]"> 
            <p>
                {plant.notes}
            </p>
        </section>
        <section className="flex flex-col gap-[15px] p-[20px]">
            {plant.comments.map((comment) => {
                    return(
                        <article id={comment.id} className="bg-cyan-400 p-[15px]">
                            <span>{comment.date}</span>
                            <p>{comment.text}</p>
                        </article>
                                    )
            }
            )}
        </section>
        
        </main>
    )
}