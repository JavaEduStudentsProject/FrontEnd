import {render, screen} from '@testing-library/react';

import ProductCard from '../components/all products components/ProductCard'
import {MemoryRouter} from "react-router";
import '@testing-library/jest-dom/extend-expect';

const data = {
        "id": 4,
        "title": "Kids Casual Slim Fit",
        "category": "clothing",
        "price": "15.99",
        "filter_features":
            {
                "subCategory": "kid's clothing",
                "material": "cotton",
                "size": "28"
            },
        "non-filter_features": {
            "rating": {
                "rate": "2.1",
                "count": "430"
            },
            "color": "red",
            "country": "Bangladesh",
            "style": "casual"
        },
        "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
        "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
    }

    const emptyData = {}

describe('ProductCard component', () => {
    test('ProductCard renders', () => {
        render(<ProductCard item={data}/>, {wrapper: MemoryRouter});

        const linkElement = screen.getByText(/Kids Casual Slim Fit/i);

        // eslint-disable-next-line jest/valid-expect
        expect(linkElement).toBeInTheDocument();

        expect(screen.getByRole('list')).toBeInTheDocument();
    })

    test('List Product card renders without data', () => {
        render(<ProductCard />, {wrapper: MemoryRouter});

        expect(screen.queryByRole('list')).toBeNull();
    })

    test('List snapshot', () => {
        const view = render(<ProductCard item={data}/>, {wrapper: MemoryRouter});
        expect(view).toMatchSnapshot();
    })
})