// import appLogo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'

export default function Header(){
    return(
        <header className="fixed bottom-0 right-0 left-0 h-[60px] pb-safe flex items-center gap-4 pr-[20px] pl-[20px] bg-primary z-1">
            {/* <img src={appLogo} className="h-[50px]"></img> */}
            <nav className="grow w-[100] content-center">
                <ul className="flex  w-[100] gap-4 items-center justify-center">
                    <li><NavLink to="/" >Mis plantas</NavLink></li>
                    <li><NavLink to="/newplant">Nueva planta</NavLink></li>
                    <li><NavLink to="/careplants">Cuidados</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}