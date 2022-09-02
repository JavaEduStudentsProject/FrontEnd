import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from "./header components/Header";
import '@testing-library/jest-dom/extend-expect';

describe ("Header component", () => {
    test("Header renders", ()=> {
        render(<Header/>);
        expect(screen.getByText('Каталог')).toBeInTheDocument();
    });
});