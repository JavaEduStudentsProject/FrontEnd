import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './components/App';
import '@testing-library/jest-dom/extend-expect';


test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Все товары/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Каталог/i);
    expect(linkElement).toBeInTheDocument();
});


// test('url is correct', () => {
//     render(<App />);
//     const linkElement = screen.getByText(/Все товары/i);
//     expect(linkElement.href).toContain('localhost:3000');
// });