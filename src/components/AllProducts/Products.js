import React, {useContext, useState, useMemo} from 'react';
import ProductCard from "../AllProducts/ProductCard";
import MySelect from "../UI/select/MySelect";
import Filter from "./Filter";
import Scroll from "./Scroll";
import {Context} from "../Context.js";
import {useParams} from "react-router-dom";
import Title from "../UI/select/Title";
import Sort from "../UI/select/Sort";
import Hr from "../UI/select/Hr";
import Pagination from "react-bootstrap/Pagination";


const Products = (props) => {
    let productArray = [];
    const [products, setProducts] = useContext(Context);
    const [sortingKey, setSortingKey] = useState("");
    const [directSort, setDirectSort] = useState(true);
    console.log(useParams());
    const {category} = useParams();

    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    console.log(props.searchField)
    if (category) {
        productArray = products.filter(p => p.category === category).filter(item => {
            const fullFilter = item.title + item.description;
            return fullFilter.toLowerCase().includes(props.searchField.toLowerCase());
        })

    } else {
        productArray = products.filter(item => {
            const fullFilter = item.title + item.description + item.category;
            return fullFilter.toLowerCase().includes(props.searchField.toLowerCase());
        })
    }

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

    let sortDate;

    const sortProducts = (field) => {
        setSortingKey(field);
        directSort
            ?
            sortDate = ([...products].sort(
                (a, b) => a[field] > b[field] ? 1 : -1
            ))
            :
            sortDate = ([...products].sort(
                (a, b) => a[field] > b[field] ? 1 : -1
            )).reverse();

        setProducts(sortDate);
        setDirectSort(!directSort);
        setSortingKey('');
    }

    return (
        <div className="main-content-products">
            <Filter productArray={productArray} category={category}/>
            <div className="all-products">
                <h1>Все продукты</h1>
                <hr/>
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
                <hr/>

                <Title category={category}/>
                <Hr item={category}/>
                <Sort category={category} setPerPage={setPerPage}/>
                <Hr item={category}/>

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