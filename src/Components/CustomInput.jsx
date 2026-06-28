export default function CustomInput({text, placeholder, value, handleOnChange, type}){
    return(
        <label className="flex justify-between">
            <span className="w-fit">{text}</span>
            <input className="bg-white" type={type} placeholder={placeholder} value={value} onChange={handleOnChange}/>
        </label>
    )
}