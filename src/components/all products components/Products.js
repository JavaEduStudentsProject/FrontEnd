import React, {useContext, useState, useMemo} from 'react';
import ProductCard from "./ProductCard";
import MySelect from "../UI/select/MySelect";
import Filter from "./Filter";
import Scroll from "./Scroll";
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
    const {immutableProductList} = useContext(ImmutableProductListContext);
    console.log(immutableProductList)
    // const [products, setProducts] = useState(immutableProductList);
    const {products, setProducts} = useContext(ProductListContext);
    // const [products, setProducts] = useState(immutableProductList);
    console.log(products)
    const [sortingKey, setSortingKey] = useState("");
    const [directSort, setDirectSort] = useState(true);

    const {category, subcategory} = useParams();

    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setPerPage] = useState(5);

    const {filterArray} = useContext(FilterArrayContext);
    const {priceDelta} = useContext(PriceFilterArrayContext);


    function print5() {
        console.log(category)
    }

    function print6() {
        console.log(subcategory)
    }

    // window.onbeforeunload = function(e) {
    // function reload(e) {
    //     let filteredProductList = ProductList.filterProducts(products, priceDelta, filterArray);
    //     console.log("Итоговый лист продуктов для рендеринга после обновления страницы:")
    //     console.log(filteredProductList)
    //     setProducts(filteredProductList);
    // }

    // productArrayForRendering
    // if (subcategory) {
    //     productArray = products.filter(product => ProductList.flatProduct(product)["subCategory"] === subcategory).filter(item => {
    //         const fullFilter = item.title + item.description;
    //         return fullFilter.toLowerCase().includes(props.searchField.toLowerCase());
    //     })
    //
    // } else if (category) {
    //     productArray = products.filter(product => product.category === category).filter(item => {
    //         const fullFilter = item.title + item.description;
    //         return fullFilter.toLowerCase().includes(props.searchField.toLowerCase());
    //     })
    // } else {
    //     productArray = products.filter(item => {
    //         const fullFilter = item.title + item.description + item.category;
    //         return fullFilter.toLowerCase().includes(props.searchField.toLowerCase());
    //     })
    //
    // }

    const {pagItems, firstPageIndex, lastPageIndex} = useMemo(() => {
            const pageLimit = Math.ceil(products.length / perPage)
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
        }, [currentPage, products.length, perPage]
    )

    const productListPerOnePage = () => {
        let productList = [];

        if (category) {

            filterArray[0] = category;

            if (subcategory) {
                filterArray[1] = subcategory;
            }
            console.log(products);
            productList = ProductList.filterProducts(products, priceDelta, filterArray);
            console.log(productList)
        } else {
            productList = products;
        }
        console.log(productList)
        return productList.length
            ?
            productList.slice(firstPageIndex, lastPageIndex).map(item => {
                return <ProductCard
                    key={item.id}
                    item={item}
                />
            })
            :
            <h4>Продукты не найдены</h4>
    }

    const sortProducts = (field) => {
        setSortingKey(field);
        setProducts(ProductList.sortProducts(products, field, directSort));
        setDirectSort(!directSort);
        setSortingKey('');
    }

    const paginationProducts = (field) => {
        setPerPage(Number(field))
    }

    // setProducts(ProductList.filterProducts(products, filterArray, priceDelta));

    // let {filterArray} = useContext(FilterArrayContext);
    return (

        <div className="main-content-products">
            {category && <Filter productArray={products} category={category}/>}
            <div className="all-products">
                <Title category={category}/>
                <MySelect
                    value={sortingKey}
                    onChange={sortProducts}
                    defaultValue="Сортировка по"
                    options={[
                        {value: 'id', name: "По id"},
                        {value: 'category', name: "По категории"},
                        {value: 'price', name: "По цене"},
                    ]}
                />
                <MySelect
                    value={sortingKey}
                    onChange={paginationProducts}
                    defaultValue="5"
                    options={[
                        {value: '10', name: "10"},
                        {value: '50', name: "50"},
                        {value: `-1`, name: "Показать все"},
                    ]}/>

                {/*<Scroll>*/}
                <ul className="products">
                    {productListPerOnePage()}
                </ul>
                {/*</Scroll>*/}

                <Pagination className='justify-content-center'>
                    {/*<Pagination.Prev/>*/}
                    {pagItems}
                    {/*<Pagination.Next/>*/}
                </Pagination>

            </div>
            <button onClick={print5}>Категория из юз парамс</button>
            <button onClick={print6}>Субкатегория из юз парамс</button>
        </div>
    );
};

export default Products;