import {render, screen} from '@testing-library/react';

import {MemoryRouter} from "react-router";
import '@testing-library/jest-dom/extend-expect';
import Row from "../components/all products components/Row";
import App from "../components/App"
import {FilterArrayContext} from "../services/Context"
import userEvent from "@testing-library/user-event";
import React from "react";

const fieldName = "Test feature";
const value = "One";

const onChange = jest.fn();

describe('Row component', () => {
    test('Row renders', () => {
        render(<FilterArrayContext.Provider value={{filterArray: ["Category name", ""]}}>
            <Row fieldName={fieldName} value={value}>{value}
            </Row></FilterArrayContext.Provider>)

        expect(screen.getByText(/One/i)).toBeInTheDocument();
    })

    test('Row component checked', () => {
        render(<FilterArrayContext.Provider value={{filterArray: ["Category name", ""]}}>
            <Row fieldName={fieldName} value={value}>
                <input type="checkbox" className="row" value={value}
                       onChange={onChange}/>
            </Row>
        </FilterArrayContext.Provider>)

        userEvent.click(screen.getByText(value));

        expect(onChange).toBeCalled();
    })
})