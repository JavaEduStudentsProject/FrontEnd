import React from "react";
import PriceComponent from "./PriceComponent"
import ShortProductDescription from "./ShortProductDescription";
import {useParams} from "react-router-dom"
import ImagesGallery from "./ImageGallery";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import OutputReview from "../review/OutputReview";
import {useEffect} from "react";
import ProductService from "../../services/ProductService";

export default function SingleProduct(props) {

    useEffect(() => {
        console.log("Вызов useEffect до геттера")
        ProductService.getAllReviews().then((response) => {
            localStorage.setItem('allReviewsFromDB', JSON.stringify(response.data))
        }).catch(error => {
            console.log(error);
        })
        console.log("Вызов useEffect после геттера")
    }, [])

    let immutable = JSON.parse(localStorage.getItem('immutableProductList'))

    const {id} = useParams();
    localStorage.setItem(`${id}`, JSON.stringify(immutable.find(p => p.id === Number(id))))

    let product = JSON.parse(localStorage.getItem(`${id}`))

    const {setCountProductInBasket, countProductInBasket} = props;

    function getImage() {
        console.log(product.gallery_images.length)
        return product.image[0] !== "h" ? require(`../../images/${product.image}`) : process.env.PUBLIC_URL + product.image;
    }

    function getFilterProps(product) {
        let filterProps = [];
        for (let feature in product["filter_features"]) {
            if (!filterProps.includes(feature) && feature !== "subCategory") {
                filterProps.push(feature);
            }
        }
        console.log(filterProps)
        return filterProps;
    }

    return (
        <div className="single-product">
            <h1 className="productName">{product.title}</h1>
            <div className="main-block">
                <div className="product-card">
                    <div className="img-and-shortdescr">
                        <ImagesGallery product={product}/>
                        <ShortProductDescription product={product}/>
                    </div>
                    <div>
                        <Tabs>
                            <TabList>
                                <Tab>Описание товара</Tab>
                                <Tab>Характеристики</Tab>
                                <Tab>Отзывы</Tab>
                            </TabList>
                            <TabPanel>
                               <ul>
                                    <li>
                                    {product.description}
                                    </li>
                               </ul>
                            </TabPanel>
                            <TabPanel>
                                <ul>
                                    <li>{product["filter_features"].brand}</li>
                                </ul>
                            </TabPanel>
                            <TabPanel>
                                <OutputReview
                                    productId={product.id}/>x
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
                <div className="money-block">
                    <PriceComponent countProductInBasket={countProductInBasket}
                                    incrementProductCount={props.incrementProductCount}
                                    decrementProductCount={props.decrementProductCount}
                                    setCountProductInBasket={setCountProductInBasket} product={product}
                                    deleteProductFromCart={props.deleteProductFromCart}
                                    removeProductFromCart={props.removeProductFromCart}
                                    addProductInCart={props.addProductInCart}/>
                </div>
            </div>
        </div>
    )

}
