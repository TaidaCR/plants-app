import pillImg from '../assets/pill.svg'
import sparklesImg from '../assets/sparkles.svg'
import dropImg from '../assets/drop.svg'

export default function ActionToggle({ setFunctionality, functionality }) {
    return (
        <div className="mb-[15px] sticky top-[10px] shadow-md bottom-[65px] actions-section bg-white rounded-lg col-span-3 justify-around flex gap-[10px] p-[7px]">
            <input className="sr-only peer/water" id="option-water" onChange={() => setFunctionality('waterPlant')} type="radio" name="functionality" checked={functionality === 'waterPlant'}></input>
            <label htmlFor="option-water" className="rounded-lg flex text-xs peer-checked/water:bg-primary items-center w-30 justify-center"><img width="30" src={dropImg} className="p-[7px]  rounded-md undefined" alt="" /><p>Regar</p></label>

            <input className="sr-only peer/fertilize" id="option-fertilize" onChange={() => setFunctionality('fertilizePlant')} type="radio" name="functionality" checked={functionality === 'fertilizePlant'}></input>
            <label htmlFor="option-fertilize" className="rounded-lg flex text-xs peer-checked/fertilize:bg-primary items-center w-30 justify-center"><img width="30" src={sparklesImg} className="p-[7px] rounded-md undefined" alt="" /><p>Fertilizar</p></label>

            <input className="sr-only peer/treat" id="option-treat" onChange={() => setFunctionality('treatPlant')} type="radio" name="functionality" checked={functionality === 'treatPlant'}></input>
            <label htmlFor="option-treat" className="rounded-lg flex text-xs peer-checked/treat:bg-primary items-center w-30 justify-center"><img width="30" src={pillImg} className="p-[7px] rounded-md undefined" alt="" /><p>Tratar</p></label>
        </div>
    )
}