import React from "react";
import ProductService from "../services/ProductService";

export const ImmutableProductListContext = React.createContext(null
//     // {immutableProductList: require('../temp_props.json'),}
    );

export const ProductListContext = React.createContext(null)


// export const FilterKeyValueContext = React.createContext( {
//     filterArray: [
//         {category: ""},
//         {subCategory: ""},
//     ]
// }
//     );

// export const FilterKeyValueContext = React.createContext({
//         category: "",
//         subCategory: "",
//     }
// );

// export const FilterArrayContext = React.createContext({
//     filterArray: ["", ""],
//     someChecked: false
//     }
// );

export const FilterArrayContext = React.createContext(
    {
        filterArray: ["", ""],
        setFilterArray: () => {}
    }
);


export const PriceFilterArrayContext = React.createContext(
    {
        priceDelta: [0, 1000000000],
        setPriceDeltaLeft: (value) => {
            console.log(this.priceDelta)
            console.log("Entered value: " + value)
            this.priceDelta[0] = value;
        },
        setPriceDeltaRight: (value) => {
            console.log("Entered value: " + value)
            this.priceDelta[1] = value;
        }
    });

