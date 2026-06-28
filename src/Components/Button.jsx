export default function Button({handleClick, text, imgUrl}){
    return(
        <button onClick={handleClick} className="text-xs p-[10px] font-semibold rounded-md justify-items-center"><img src={imgUrl} width="40px" className="p-[7px] bg-primary rounded-md" alt=""/>{text}</button>
    )
}