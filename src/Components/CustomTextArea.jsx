export default function CustomTextArea({text, value, handleOnChange}){
    return(
        <label className="flex justify-between gap-3">
            <span>{text}</span>
            <textarea className="bg-white grow p-3 border-2 border-[#dbdbdb] rounded-[5px]" rows="6" value={value} onChange={handleOnChange}></textarea>
        </label>
    )
}