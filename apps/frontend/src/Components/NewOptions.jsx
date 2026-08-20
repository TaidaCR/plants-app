import { usePlantStore } from "../store/usePlantStore"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import imgPlus from '../assets/plus.svg'

export default function NewOptionsButton() {
    const { openCamera } = usePlantStore()
    const [handleShowSelect, setHandleShowSelect] = useState(false)

    return (
        <div className="fixed bottom-[120px] right-[20px] z-[9] flex flex-col items-end gap-3 pointer-events-none">
            <div onClick={() => setHandleShowSelect(false)}
            className={`fixed top-0 left-0 right-0 bottom-[60px] bg-black transition-opacity duration-300 ${
                handleShowSelect ? 'opacity-30 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}/>            
                <ul className={`flex flex-col items-end gap-2 transition-all duration-300 ${handleShowSelect ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>

                <li className={`transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${handleShowSelect ? 'translate-y-0 scale-100 opacity-100 delay-75' : 'translate-y-6 scale-90 opacity-0'
                    }`}>
                    <button onClick={openCamera} className="bg-white text-gray-800 font-medium px-4 py-2 rounded-full shadow-lg hover:bg-gray-50 border border-gray-100 whitespace-nowrap">
                        Hacer foto
                    </button>
                </li>

                <li className={`transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${handleShowSelect ? 'translate-y-0 scale-100 opacity-100 delay-150' : 'translate-y-6 scale-90 opacity-0'
                    }`}>
                    <NavLink to="/newplant" className="block bg-white text-gray-800 font-medium px-4 py-2 rounded-full shadow-lg hover:bg-gray-50 border border-gray-100 whitespace-nowrap">
                        Rellenar datos manualmente
                    </NavLink>
                </li>
            </ul>

            <button onClick={() => setHandleShowSelect(!handleShowSelect)} className={`transition-all duration-300 fixed bottom-[65px] right-[20px] z-[9] w-12 h-12 flex items-center justify-center bg-accentStrong pointer-events-auto rounded-full text-white shadow-lg ${handleShowSelect ? 'rotate-90' : ''}`}><img src={imgPlus} alt="" width="30px" />
            </button>
        </div>
    )
}