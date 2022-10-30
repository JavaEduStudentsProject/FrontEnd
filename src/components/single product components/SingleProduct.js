import React from "react";
import PriceComponent from "./PriceComponent"
import ShortProductDescription from "./ShortProductDescription";
import {useParams} from "react-router-dom"
import ImagesGallery from "./ImageGallery";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.css';

export default function SingleProduct(props) {

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
            }console.log(filterProps)
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
                            {/*<button onClick={()=>getFilterProps(product)}> govno</button>*/}
                            <Tabs>
                                <TabList>
                                    <Tab>Description</Tab>
                                    <Tab>Characteristic</Tab>
                                    <Tab>Review</Tab>
                                </TabList>

                                <TabPanel>
                                    <li>
                                        {product.description}

                                    </li>
                                </TabPanel>
                                <TabPanel>
                                    hello
                                    <ul>
                                        {/*<li>{product["filter_features"]}</li>*/}
                                        {/*{characteristics.forEach(ch=>{*/}
                                        {/*    if (ch != null){*/}
                                        {/*        <li>{ch}</li>*/}
                                        {/*    }*/}
                                        {/*}*/}
                                        {/*    */}
                                        {/*)}*/}
                                    </ul>
                                </TabPanel>
                                <TabPanel>
                                    <li>review</li>
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
                        {/*<MoneyInCreditComponent/>*/}
                    </div>
                </div>
            </div>
        )

}
