export default function InfoPill({text, value}){
    return <p className="pb-[10px] bg-white p-3 rounded-xl flex justify-between font-normal text-detail"><span>{text}</span> <span>{value}</span></p>
}