import {render, screen} from '@testing-library/react';

import {MemoryRouter} from "react-router";
import '@testing-library/jest-dom/extend-expect';
import Products from "../components/all products components/Products";
import {FilterArrayContext, ImmutableProductListContext, ProductListContext} from "../services/Context";
import Header from "../components/header components/Header";
import React from "react";

const data = require('../../public/temp_props_1.json');

describe('Products component', () => {
    test('Products renders', () => {
        render(<ImmutableProductListContext.Provider value={{immutableProductList: data}}>
                <ProductListContext.Provider value={{productArray: data}}>
                    <FilterArrayContext.Provider value={{filterArray: ["", ""], setFilterArray: (value) => value}}>
                        <Products searchField={""}/>
                    </FilterArrayContext.Provider>
                </ProductListContext.Provider>
            </ImmutableProductListContext.Provider>,
            {wrapper: MemoryRouter})

        expect(screen.getAllByText(/category/i).length).toBeGreaterThanOrEqual(5);
    })
})