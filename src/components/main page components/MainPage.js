import React, {useState, useContext} from 'react';
import BestProductsRecommendation from "./BestProductsRecommendation";
import CosineSimilarityRecommendation from "./CosineSimilarityRecommendation";
import ProductService from "../../services/ProductService";
import {ImmutableProductListContext} from "../../services/Context";

const MainPage = (props) => {
    const {immutableProductList} = useContext(ImmutableProductListContext);
    localStorage.setItem('immutableProductList', JSON.stringify(immutableProductList));

    return (
        <div>
            <CosineSimilarityRecommendation cosineArray={props.cosineArray}/>
            <BestProductsRecommendation bestProductArray={props.bestProductArray}/>
        </div>
    );
};

export default MainPage;