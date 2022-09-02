import {render, screen} from '@testing-library/react';

import {MemoryRouter} from "react-router";
import '@testing-library/jest-dom/extend-expect';
import Row from "../components/all products components/Row";
import App from "../components/App"
import {FilterArrayContext} from "../services/Context"

const fieldName = "Test feature";
const value = "One";

// jest.mock('../services/Context', () => ({
//     FilterArrayContext: {
//         filterArray: ["Category name", ""]
//     }
// }));

describe('Row component', () => {
    test('Row renders', () => {
        render(<FilterArrayContext.Provider value={{filterArray: ["Category name", ""]}}><Row fieldName={fieldName} value={value}>
                One
            </Row></FilterArrayContext.Provider>
        )

        expect(screen.getByText(/One/i)).toBeInTheDocument();
    })
})