import { GoArrowSmallUp } from "react-icons/go";
import { GoArrowSmallDown } from "react-icons/go";
import Cart from "./Cart";
import {useState} from "react";

const Count=(props)=>{
    const [quantity, setQuantity] = useState(1);
    return (
        <div className="count">
            <div className="count_box">
                <input type="number" className="count_input" min='1' max='100'onChange={(event) => {setQuantity(event.target.value); console.log(event.target.value)}}

                />
            </div>
            <div className="count_controls">
                {/*<button type="button" className='count_up' onClick={()=>{props.increase(props.id)}}>*/}
                {/*    <GoArrowSmallUp className='count_up'/>*/}
                {/*</button>*/}
                {/*<button type="button" className='count_down'>*/}
                {/*    <GoArrowSmallDown className='count_down'/>*/}
                {/*</button>*/}
            </div>
        </div>
    )

}
export default Count;