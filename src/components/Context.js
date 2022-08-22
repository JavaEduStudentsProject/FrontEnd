import React from "react";

export const ProductListContext = React.createContext(null)


export const FilterArrayContext = React.createContext(
    {
        filterArray: [],
        setFilterArray: (value) => {
            return this.filterArray.push(value)
        }
    });

