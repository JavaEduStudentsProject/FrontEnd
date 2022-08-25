import React from 'react';
import {ProductListContext} from "../Context";


export default function BasketContent() {
    const [products] = React.useContext(ProductListContext);

return (
    <h1>
        Это корзина
    </h1>
)}
