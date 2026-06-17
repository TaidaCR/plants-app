export default function Button({handleClick, text}){
    return(
        <button onClick={handleClick} className="p-[10px] bg-red-300 font-semibold rounded-md">{text}</button>
    )
}