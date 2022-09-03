import {fireEvent, render, screen} from '@testing-library/react';

import {MemoryRouter, useNavigate} from "react-router";
import '@testing-library/jest-dom/extend-expect';
import Row from "../components/all products components/Row";
import App from "../components/App"
import Filter from "../components/all products components/Filter"
import Header from "../components/header components/Header"
import Products from "../components/all products components/Products"
import {FilterArrayContext, ImmutableProductListContext, ProductListContext} from "../services/Context"
import userEvent from "@testing-library/user-event";
import React, {useState} from "react";

const data = require('../../public/temp_props_1.json');

describe('Filter component', () => {
    test('Integration test for filter', () => {
        render(<ImmutableProductListContext.Provider value={{immutableProductList: data}}>
                <ProductListContext.Provider value={{productArray: data}}>
                    <FilterArrayContext.Provider value={{filterArray: ["", ""], setFilterArray: (value) => value}}>
                        <Header/>
                        <Products searchField={""}/>
                    </FilterArrayContext.Provider>
                </ProductListContext.Provider>
            </ImmutableProductListContext.Provider>,
            {wrapper: MemoryRouter})

        expect(screen.getAllByText(/category/i).length).toBeGreaterThanOrEqual(5);

        // userEvent.hover(screen.getByRole('link', {name: /electronics/i}));
        userEvent.click(screen.getByRole('link', {name: /electronics/i}));

        expect(screen.getAllByText(/electronics/i)).toBeInTheDocument();

        userEvent.click(screen.getByText(/apple/i));
        userEvent.click(screen.getByRole('button', {name: /найти/i}));

        expect(screen.queryAllByDisplayValue(/brand: Apple/i).length).toBeInTheDocument();
        expect(screen.queryAllByDisplayValue(/brand: Apple/i).length).toBeGreaterThanOrEqual(2);

    })

})