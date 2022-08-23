import React from "react";

export const ProductListContext = React.createContext(null)


export const FilterArrayContext = React.createContext(
    {
        filterArray: [],
        setFilterArray: (value) => {
            return this.filterArray.push(value)
        }
    });


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

