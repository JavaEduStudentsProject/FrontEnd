import React, {useContext, useState} from 'react';
import {PriceFilterArrayContext} from "../../services/Context";

const PriceFilterField = () => {
    const {priceDelta, setPriceDeltaLeft, setPriceDeltaRight} = useContext(PriceFilterArrayContext);
    console.log(priceDelta)


    function setLeftValue(event) {
        if (event.target.value < 0) {
            //todo установление дефолтного значения
            alert("Введите число больше нуля")
            priceDelta[0] = "0";
            document.getElementById('price-filter').reset();
        } else {
            priceDelta[0] = event.target.value;
            console.log(priceDelta);
        }
    }

    function setRightValue(event) {
        // setPriceDeltaRight(event.target.value);
        priceDelta[1] = event.target.value;
        console.log(priceDelta);
    }


    return (
        <div>
            {/*//todo по дефолту должны указываться цифры от нуля до самой высокой цены в каталоге (вытащить из списка продуктов) */}
            {/*todo + сделать чуть прозрачным*/}
            <input id="left-price" className="form-input" type="text" defaultValue="0"
                   onChange={event => setLeftValue(event)}/>
            <input className="form-input" type="text" defaultValue="1000000000"
                   onChange={event => setRightValue(event)}/>
        </div>
    );
};

export default PriceFilterField;