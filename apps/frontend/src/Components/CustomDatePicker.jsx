import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

export default function CustomDatePicker({text, name, selected, handleOnChange, placeholderText, className}){
    return(
        <label className={`pb-[10px] bg-white p-3 rounded-xl flex justify-between font-normal text-detail ${className || ""}`}>
            <span className="flex">{text}</span>
            <DatePicker className="bg-secondary" name={name} placeholderText={placeholderText} dateFormat="dd/MM/yyyy" selected={selected} onChange={handleOnChange}/>
        </label>
    )
}