import {render, screen} from '@testing-library/react';

import ProductCard from '../components/all products components/ProductCard'
import {MemoryRouter} from "react-router";
import '@testing-library/jest-dom/extend-expect';

// const data = [
//     {
//         category: "clothing",
//         color: "yellow",
//         count: "120",
//         country: "Bangladesh",
//         description: "Your perfect pack",
//         id: 1,
//         image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//         material: "wool",
//         price: "109.95",
//         rate: "3.9",
//         size: "48",
//         subCategory: "men's clothing",
//         title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
//     },
//     {
//         category: "clothing",
//         color: "red",
//         count: "259",
//         country: "Bangladesh",
//         description: "Slim-fitting style.",
//         id: 2,
//         image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
//         material: "cotton",
//         price: "22.3",
//         rate: "4.1",
//         size: "48",
//         subCategory: "men's clothing",
//         title: "Mens Casual Premium Slim Fit T-Shirts "
//     },
//     {
//         category: "jewelery",
//         count: "400",
//         country: "Italy",
//         description: "From our Legends Collection.",
//         gold_content: "999",
//         id: 5,
//         image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
//         material: "gold",
//         price: "695",
//         rate: "4.6",
//         subCategory: "women's jewelery",
//         title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet"
//     }
// ]

// const data = [
//     {
//         "id": 4,
//         "title": "Kids Casual Slim Fit",
//         "category": "clothing",
//         "price": "15.99",
//         "filter_features":
//             {
//                 "subCategory": "kid's clothing",
//                 "material": "cotton",
//                 "size": "28"
//             },
//         "non-filter_features": {
//             "rating": {
//                 "rate": "2.1",
//                 "count": "430"
//             },
//             "color": "red",
//             "country": "Bangladesh",
//             "style": "casual"
//         },
//         "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
//         "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
//     },
//     {
//         "id": 5,
//         "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
//         "category": "jewelery",
//         "price": "695",
//         "filter_features":
//             {
//                 "subCategory": "women's jewelery",
//                 "material": "gold"
//             },
//         "non-filter_features": {
//             "rating": {
//                 "rate": "4.6",
//                 "count": "400"
//             },
//             "country": "Italy",
//             "gold_content": "999"
//         },
//         "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
//         "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
//     },
//     {
//         "id": 6,
//         "title": "Solid Gold Petite Micropave ",
//         "category": "jewelery",
//         "price": "168",
//         "filter_features":
//             {
//                 "subCategory": "men's jewelery",
//                 "material": "silver"
//             },
//         "non-filter_features": {
//             "rating": {
//                 "rate": "3.9",
//                 "count": "70"
//             },
//             "country": "Russia",
//             "silver_content": "999"
//         },
//         "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
//         "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
//     },
//     {
//         "id": 7,
//         "title": "White Gold Plated Princess",
//         "category": "jewelery",
//         "price": "9.99",
//         "filter_features":
//             {
//                 "subCategory": "men's jewelery",
//                 "material": "silver"
//             },
//         "non-filter_features": {
//             "rating": {
//                 "rate": "3",
//                 "count": "400"
//             },
//             "country": "China",
//             "silver_content": "550"
//         },
//         "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
//         "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
//     },
//
//     {
//         "id": 9,
//         "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
//         "category": "electronics",
//         "price": "64",
//         "filter_features":
//             {
//                 "subCategory": "hard drives",
//                 "memory": "1 Tb"
//             },
//         "non-filter_features": {
//             "rating": {
//                 "rate": "3.3",
//                 "count": "203"
//             },
//             "producer": "Seagate",
//             "color": "black"
//         },
//         "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
//         "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
//     }
// ]

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