import React from "react";
import ShortProductDescription from "./ShortProductDescription";
import {useParams} from "react-router-dom"
import ImagesGallery from "./ImageGallery";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import OutputReview from "../review/OutputReview";
import {useEffect} from "react";
import ProductService from "../../services/ProductService";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";

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
    let products = JSON.parse(localStorage.getItem('wishList'))
    console.log(products)
    const product1 = products.filter(product1 => product1.id === product.id)
    console.log(product1)
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
                        {product1.length
                            ?
                            <AiFillHeart/>
                            :
                            <AiOutlineHeart onClick={() => props.addProductInWish(product.id)}/>}
                        <ImagesGallery product={product}/>
                        <ShortProductDescription product={product} incrementProductCount={props.incrementProductCount} decrementProductCount={props.decrementProductCount}/>

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
                                    productId={product.id}/>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>

            </div>
        </div>
    )

}
