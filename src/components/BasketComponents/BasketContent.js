import React from 'react';
import {ProductListContext} from "../Context";


function BasketContent() {
    const [products] = React.useContext(ProductListContext);
}

export default BasketContent;