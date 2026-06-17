import appLogo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'

export default function Header(){
    return(
        <header className="h-[80px] flex items-center gap-4 pr-[20px] pl-[20px] bg-[#f5f5f5]">
            <img src={appLogo} className="h-[50px]"></img>
            <nav className="grow w-[100] content-center">
                <ul className="flex  w-[100] gap-4 items-center justify-center">
                    <li><NavLink to="/" >Mis plantas</NavLink></li>
                    <li><NavLink to="/newplant">Nueva planta</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}