export default function CustomTextArea({text, value, handleOnChange, name, className}){
    return(
        <label className={`pb-[10px] bg-white p-3 rounded-xl flex justify-between font-normal text-detail ${className || ""}`}>
            <span>{text}</span>
            <textarea className="bg-white grow p-3 border-2 border-[#dbdbdb] rounded-[5px]" rows="6" value={value} name={name} onChange={handleOnChange}></textarea>
        </label>
    )
}