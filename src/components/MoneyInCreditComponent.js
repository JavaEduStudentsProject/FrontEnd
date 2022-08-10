import React, {useRef, useState} from 'react';
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import CreditForm from "./CreditForm";

const MoneyInCreditComponent = () => {
    let sinners = [];

    const createSinner = (newSinner) => {
        sinners.push(newSinner);
        console.log(sinners);
    }

    return (
        <div className="credit">
            <h3>Можем дать кредит</h3>
            {/*//todo здесь сделать селект на банки*/}
            <MyButton id="creditButton" onClick={() => console.log("Redirect to bank page")}>Выбрать банк</MyButton>
            <CreditForm create={createSinner}/>
        </div>
    );
};

export default MoneyInCreditComponent;