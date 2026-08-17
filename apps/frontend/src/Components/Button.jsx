import {NavLink} from 'react-router-dom'

const baseClassBtn = "bg-accentStrong w-[170px] shadow p-2 rounded-full font-medium self-center disabled:opacity-50 text-black"
export default function Button({to, children, className = "", ...props}){
    const combinedClassName= `${baseClassBtn} ${className}`.trim()
    if (to){
        return(
            <NavLink className={combinedClassName} {...props}>
                {children}
            </NavLink>
        )
    }

    return(
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    )

}