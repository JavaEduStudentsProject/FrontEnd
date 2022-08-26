import React, {useContext} from 'react';
import {BasketArrayContext} from "./Context";


export default function BasketContent() {
    const {basketArray} = useContext(BasketArrayContext);

return (
    <h1>
        Это корзина
    </h1>
)}
