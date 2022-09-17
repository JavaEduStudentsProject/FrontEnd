import React from "react";
import ProductService from "../services/ProductService";

export const ImmutableProductListContext = React.createContext();

export const ProductListContext = React.createContext(null);

export const FilterArrayContext = React.createContext();


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

