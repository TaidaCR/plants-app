export default function CustomInput({text, placeholder, value, handleOnChange, type, name, className, ...props}){
    return(
        <label className={`pb-[10px] bg-white p-3 rounded-xl flex justify-between font-normal text-detail ${className || ""}`} {...props}>
            <span className="w-fit">{text}</span>
            <input className="h-fit bg-secondary" name={name} type={type} placeholder={placeholder} value={value} onChange={handleOnChange}/>
        </label>
    )
}