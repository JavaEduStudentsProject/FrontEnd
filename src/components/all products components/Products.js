import React, {useContext, useState, useMemo} from 'react';
import ProductCard from "./ProductCard";
import MySelect from "../UI/select/MySelect";
import Filter from "./Filter";
import {
    FilterArrayContext,
    ImmutableProductListContext, PriceFilterArrayContext,
    ProductListContext
} from "../../services/Context";
import {useParams} from "react-router-dom";
import Title from "../../components/all products components/Title";
import Pagination from "react-bootstrap/Pagination";
import ProductList from "../../services/ProductList";


const Products = (props) => {
    let productArrayForRendering = [];
    const immutableProductList = JSON.parse(localStorage.getItem('immutableProductList'));
    const {filterArray, setFilterArray} = useContext(FilterArrayContext);
    const {priceDelta} = useContext(PriceFilterArrayContext);
    const {productArray} = useContext(ProductListContext);
    const [sortingKey, setSortingKey] = useState("");
    const [directSort, setDirectSort] = useState(true);
    const [sortedProductList, setSortedProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setPerPage] = useState(8);
    const [perPageKey, setPerPageKey] = useState("");
    const [flag, setFlag] = useState(false);
    const {category, subcategory} = useParams();

    if (category) {
        if (category !== filterArray[0]) {
            filterArray[0] = category;
            filterArray[1] = "";
        }
        if (subcategory) {
            filterArray[1] = subcategory;
        }
    }


    const sortProducts = (field) => {
        setSortingKey(field);
        productArrayForRendering = ProductList.sortProducts(productArrayForRendering, field, directSort);
        setDirectSort(!directSort);
        // setSortingKey('');
        setSortedProductList(productArrayForRendering);
    }

    if (props.searchField !== "") {
        productArrayForRendering = productArray[0];
    } else if (sortedProductList.length) {
        productArrayForRendering = sortedProductList;
    } else {
        productArrayForRendering = ProductList.filterProducts(immutableProductList, priceDelta, filterArray);
    }

    const {pagItems, firstPageIndex, lastPageIndex} = useMemo(() => {
            let pageLimit = Math.ceil(productArrayForRendering.length / perPage)
            let pagItems = []
            for (let i = 0; i < pageLimit; i++) {
                pagItems.push(
                    <Pagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => setCurrentPage(i)}
                    >
                        {i + 1}
                    </Pagination.Item>
                )
            }
            const firstPageIndex = currentPage * perPage;
            const lastPageIndex = firstPageIndex + perPage;
            return {
                pagItems,
                firstPageIndex,
                lastPageIndex
            }
        }, [currentPage, productArrayForRendering.length, perPage]
    )


    const productListPerOnePage = () => {
        const index = lastPageIndex === -1 ? productArrayForRendering.length : lastPageIndex;
        return productArrayForRendering.length
            ?
            productArrayForRendering.slice(firstPageIndex, index).map(item => {
                return <ProductCard
                    key={item.id}
                    item={item}
                    addProductInCart={props.addProductInCart}
                    deletePurchasedProduct={props.deletePurchasedProduct}
                    incrementProductCount={props.incrementProductCount}
                    decrementProductCount={props.decrementProductCount}
                    addProductInWish={props.addProductInWish}
                />
            })
            :
            <h4>Продукты не найдены</h4>
    }

    const paginationProducts = (field) => {
        setPerPage(Number(field))
        setPerPageKey(field);
    }

    return (
        <div className="main-content-products">
            {category && <Filter setFlag={setFlag}/>}
            <div className="all-products">
                <Title category={category}/>
                <MySelect
                    value={sortingKey}
                    onChange={sortProducts}
                    defaultValue="Сортировка по"
                    options={[
                        {value: 'id', name: "id"},
                        {value: 'category', name: "категории"},
                        {value: 'price', name: "цене"},
                    ]}
                />
                <MySelect
                    value={perPageKey}
                    onChange={paginationProducts}
                    defaultValue="Товаров на странице"
                    options={[
                        {value: '8', name: "8"},
                        {value: '16', name: "16"},
                        {value: '50', name: "50"},
                        {value: '-1', name: "Показать все"},
                    ]}/>

                {/*<Scroll_Horizontal>*/}
                <div className="products">
                    {productListPerOnePage()}
                </div>
                {/*</Scroll_Horizontal>*/}

                <Pagination className='justify-content-center'>
                    {/*<Pagination.Prev/>*/}
                    {pagItems}
                    {/*<Pagination.Next/>*/}
                </Pagination>

            </div>
        </div>
    );
};

export default Products;