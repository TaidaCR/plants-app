import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

export default function CustomDatePicker({text, name, selected, handleOnChange, placeholderText, className, required = false}){
    return(
        <div className={`pb-[10px] bg-white p-3 rounded-xl flex justify-between font-normal text-detail ${className || ""}`}>
            <label className="flex">{text}</label>
            <DatePicker shouldCloseOnSelect={true} className="bg-secondary" required={required} name={name} placeholderText={placeholderText} dateFormat="dd/MM/yyyy" selected={selected} onChange={handleOnChange}/>
        </div>
    )
}