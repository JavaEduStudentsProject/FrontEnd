import React, {useContext, useState, useMemo} from 'react';
import ProductCard from "../AllProducts/ProductCard";
import MySelect from "../UI/select/MySelect";
import Filter from "./Filter";
import Scroll from "./Scroll";
import {
    CashProductListContext,
    FilterArrayContext,
    ImmutableProductListContext,
    ProductListContext
} from "../Context.js";
import {useParams} from "react-router-dom";
import Title from "../UI/select/Title";
import Pagination from "react-bootstrap/Pagination";
import ProductList from "../../ProductList";


const Products = (props) => {
    let productArray = [];
    // const [products, setProducts] = useContext(ProductListContext);
    const {immutableProductList} = React.useContext(ImmutableProductListContext);
    console.log(immutableProductList)
    const [products, setProducts] = useState(immutableProductList);
    let {cashProducts} = useContext(CashProductListContext);
    const [sortingKey, setSortingKey] = useState("");
    const [directSort, setDirectSort] = useState(true);

    const {category, subcategory} = useParams();

    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setPerPage] = useState(5);

    if (subcategory) {
        productArray = products.filter(product => ProductList.flatProduct(product)["subCategory"] === subcategory).filter(item => {
            const fullFilter = item.title + item.description;
            return fullFilter.toLowerCase().includes(props.searchField.toLowerCase());
        })
        cashProducts = productArray;
        console.log(productArray);
    } else if (category) {
        productArray = products.filter(product => product.category === category).filter(item => {
            const fullFilter = item.title + item.description;
            return fullFilter.toLowerCase().includes(props.searchField.toLowerCase());
        })
        cashProducts = productArray;
        console.log(productArray);
    } else {
        productArray = products.filter(item => {
            const fullFilter = item.title + item.description + item.category;
            return fullFilter.toLowerCase().includes(props.searchField.toLowerCase());
        })
        cashProducts = productArray;
        console.log(productArray);
    }

    cashProducts = productArray;
    console.log(cashProducts);

    const {pagItems, firstPageIndex, lastPageIndex} = useMemo(() => {
            const pageLimit = Math.ceil(productArray.length / perPage)
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
        }, [currentPage, productArray.length, perPage]
    )

    const productListPerOnePage = () => productArray.length
        ?
        productArray.slice(firstPageIndex, lastPageIndex).map(item => {
            return <ProductCard
                key={item.id}
                item={item}
            />
        })
        :
        <h4>Продукты не найдены</h4>

    const sortProducts = (field) => {
        setSortingKey(field);
        setProducts(ProductList.sortProducts(products, field, directSort));
        setDirectSort(!directSort);
        setSortingKey('');
    }

    const paginationProducts = (field) => {
        setPerPage(Number(field))
    }

    // let {filterArray} = useContext(FilterArrayContext);
    return (
        <div className="main-content-products">
            <Filter productArray={productArray} category={category}/>
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
                    ]} />

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