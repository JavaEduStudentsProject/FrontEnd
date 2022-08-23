import React, {useContext} from 'react';
import {PriceFilterArrayContext} from "../Context";

const PriceFilterField = () => {
    const {priceDelta, setPriceDeltaLeft, setPriceDeltaRight} = useContext(PriceFilterArrayContext);
    console.log(priceDelta)
    function setLeftValue(event) {
        priceDelta[0] = event.target.value;
        console.log(priceDelta);
    }

    function setRightValue(event) {
        // setPriceDeltaRight(event.target.value);
        priceDelta[1] = event.target.value;
        console.log(priceDelta);
    }


    return (
        <div>
            <input className="form-input" type="number" placeholder="От" defaultValue="0"
                   onChange={event => setLeftValue(event)}/>
            <input className="form-input" type="number" placeholder="До" defaultValue="1000000000"
                   onChange={event => setRightValue(event)}/>
        </div>
    );
};

export default PriceFilterField;