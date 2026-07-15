export default function CustomTextArea({text, value, handleOnChange, name, className}){
    return(
        <label className={`pb-[10px] bg-white p-3 rounded-xl flex flex-col justify-between font-normal text-detail ${className || ""}`}>
            <span className="mb-[10px]">{text}</span>
            <textarea className="bg-secondary border-0 grow p-3 rounded-[5px]" rows="6" value={value} name={name} onChange={handleOnChange}></textarea>
        </label>
    )
}