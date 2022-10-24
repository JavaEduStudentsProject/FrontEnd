import React, {useState} from 'react';
import BestProductsRecommendation from "./BestProductsRecommendation";
import CosineSimilarityRecommendation from "./CosineSimilarityRecommendation";
import ProductService from "../../services/ProductService";

const MainPage = (props) => {

    return (
        <div>
            <CosineSimilarityRecommendation cosineArray={props.cosineArray}/>
            <BestProductsRecommendation bestProductArray={props.bestProductArray}/>
        </div>
    );
};

export default MainPage;