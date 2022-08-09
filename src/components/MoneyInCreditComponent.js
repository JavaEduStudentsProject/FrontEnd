import React from 'react';

const MoneyInCreditComponent = () => {
    return (
        <div className="credit">
            <h6>Можем дать кредит</h6>
            <button id="creditButton" onClick={() => console.log("Redirect to bank page")}>Выбрать банк</button>
        </div>
    );
};

export default MoneyInCreditComponent;