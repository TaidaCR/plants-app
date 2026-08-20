export default function ActionPanelButton({handleClick, text, imgUrl, addedClass, imgClass, ...props}) {
    return(
        <button onClick={handleClick} {...props} className={`text-xs p-[10px] font-semibold rounded-md justify-items-center ${addedClass}`}><img src={imgUrl} width="40px" className={`p-[7px] bg-primary rounded-md ${imgClass}`} alt=""/>{text}</button>
    )
}