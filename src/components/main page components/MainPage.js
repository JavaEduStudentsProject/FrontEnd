import React, {useEffect, useState} from 'react';
import BestProductsRecommendation from "./BestProductsRecommendation";
import CosineSimilarityRecommendation from "./CosineSimilarityRecommendation";
import ProductService from "../../services/ProductService";
import SockJsClient from "react-stomp";
import BestProductsRecommendationTwo from "./BestProductsRecommendationTwo";

const MainPage = (props) => {
    const [cosineArray, setCosineArray] = useState([])
    const [bestProductArray, setBestProductArray] = useState({})

    // let user = JSON.parse(localStorage.getItem("user"));
    // let username = user.username;
    // console.log(username);
    // ProductService.getRecommendedProducts(username);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        let username = user.username;
        console.log(username);
        ProductService.getRecommendedProducts(username);
    }, [])


    const SOCKET_URL = 'http://localhost:8083/ws-connect/';


    let onConnected = () => {
        console.log("Connected!!")
    }

    let onDisconnected = () => {
        console.log("Disconnected!")
    }


    function onMessageReceivedOne(msg) {
        console.log('New Message Received (cosine)!!', msg);
        setCosineArray(prevArray => [...prevArray].concat(msg));
    }

    console.log(cosineArray)

    let onMessageReceivedTwo = (msg) => {
        console.log('New Message Received (best)!!', msg);
        setBestProductArray(msg);
    }

    console.log(bestProductArray)

    return (
        <div>
            <CosineSimilarityRecommendation cosineArray={cosineArray}/>
            <BestProductsRecommendation bestProductArray={bestProductArray}/>
            {/*<BestProductsRecommendationTwo bestProductArray={bestProductArray}/>*/}
            <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/cosineSimData']}
                onConnect={onConnected}
                onDisconnect={onDisconnected}
                onMessage={msg => onMessageReceivedOne(msg)}
                debug={false}
            />
            <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/bestProductData']}
                onConnect={onConnected}
                onDisconnect={onDisconnected}
                onMessage={msg => onMessageReceivedTwo(msg)}
                debug={false}
            />
        </div>
    );
};

export default MainPage;