import React, {useContext, useState, useMemo, useEffect} from 'react';
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

    const [sortingKey, setSortingKey] = useState("");
    const [directSort, setDirectSort] = useState(true);

    const {category, subcategory} = useParams();

    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setPerPage] = useState(5);

    // let tempFilterArray = [category ? category : "", subcategory ? subcategory : ""];
    // console.log(tempFilterArray)

    const {filterArray, setFilterArray} = useContext(FilterArrayContext);
    const {priceDelta} = useContext(PriceFilterArrayContext);
    const [flag, setFlag] = useState(false);


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


    if (category) {
        if (category !== filterArray[0]) {
            filterArray[0] = category;
            filterArray[1] = "";
        }
        if (subcategory) {
            filterArray[1] = subcategory;
        }
    }

    // if (props.productArray.length > 0) {
    if (props.searchField !== "") {
        productArrayForRendering = props.productArray;
    } else {
        productArrayForRendering = ProductList.filterProducts(immutableProductList, priceDelta, filterArray);
    }


    const {pagItems, firstPageIndex, lastPageIndex} = useMemo(() => {
            const pageLimit = Math.ceil(productArrayForRendering.length / perPage)
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

    // const productListPerOnePage = () => {
    // const productList = productArrayForRendering.map(item => <ProductCard key={item.id} item={item}/>);
    const productListPerOnePage = () => {
        return productArrayForRendering.length
            ?
            productArrayForRendering.slice(firstPageIndex, lastPageIndex).map(item => {
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
        productArrayForRendering = ProductList.sortProducts(productArrayForRendering, field, directSort);
        console.log(productArrayForRendering)
        setDirectSort(!directSort);
        setSortingKey('');
    }

    const paginationProducts = (field) => {
        setPerPage(Number(field))
    }

    return (
            <div className="main-content-products">
                {/*{category && <Filter setFlag={setFlag}/>}*/}
                <Filter setFlag={setFlag}/>
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
            </div>
    );
};

export default Products;