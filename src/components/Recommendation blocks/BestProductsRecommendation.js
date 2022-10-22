// import React from "react";
// import ProductCard from "../all products components/ProductCard";
// import {useContext, useState} from "@types/react";
// import {
//     FilterArrayContext,
//     ImmutableProductListContext,
//     PriceFilterArrayContext,
//     ProductListContext
// } from "../../services/Context";
// import {useParams} from "react-router-dom";
// import Filter from "../all products components/Filter";
// import Title from "../all products components/Title";
// import MySelect from "../UI/select/MySelect";
// import Pagination from "react-bootstrap/Pagination";
//
// const BestProductsRecommendation = (props) => {
//     let productArrayForRendering = [];
//     const {immutableProductList} = useContext(ImmutableProductListContext);
//     const {filterArray, setFilterArray} = useContext(FilterArrayContext);
//     const {priceDelta} = useContext(PriceFilterArrayContext);
//     const {productArray} = useContext(ProductListContext);
//     const [sortingKey, setSortingKey] = useState("");
//     const [directSort, setDirectSort] = useState(true);
//     const [sortedProductList, setSortedProductList] = useState([]);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [perPage, setPerPage] = useState(5);
//     const [flag, setFlag] = useState(false);
//     const {category, subcategory} = useParams();
//
//
//     const productListPerOnePage = () => {
//
//             productArrayForRendering.slice(firstPageIndex, lastPageIndex).map(item => {
//                 //вывод по "Показать все"
//                 // productArrayForRendering.slice(firstPageIndex, lastIndex).map(item => {
//                 return <ProductCard
//                     key={item.id}
//                     item={item}
//                     addProductInCart={props.addProductInCart}
//                     deletePurchasedProduct={props.deletePurchasedProduct}
//                 />
//             })
//             :
//             <h4>Продукты не найдены</h4>
//     }
//
//     return (
//         <div className="all-products">
//             <Title category={category}/>
//
//             <div className="products">
//                 {productListPerOnePage()}
//             </div>
//         </div>
//
//     );
//
// }
// export default BestProductsRecommendation