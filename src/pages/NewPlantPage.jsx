import { useChangeTitle } from "../hooks/setPageTitle"

export default function NewPlant(){
    useChangeTitle("Nueva Planta")    
    
    return(
        <form>
            <h1>Nueva planta</h1>
            <label>
                Nombre:
            </label>
            <input type="text"/>
        </form>
    )
}