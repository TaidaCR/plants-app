import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

export default function CustomDatePicker({text, name, selected, handleOnChange, placeholderText}){
    return(
        <label className="flex justify-between">
            <span className="flex">{text}</span>
            <DatePicker className="bg-white" name={name} placeholderText={placeholderText} dateFormat="dd/MM/yyyy" selected={selected} onChange={handleOnChange}/>
        </label>
    )
}