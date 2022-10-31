import React, {useEffect, useState} from 'react';
import BestProductsRecommendation from "./BestProductsRecommendation";
import CosineSimilarityRecommendation from "./CosineSimilarityRecommendation";
import ProductService from "../../services/ProductService";
import SockJsClient from "react-stomp";

const MainPage = (props) => {
    const [cosineArray, setCosineArray] = useState([])
    const [bestProductArray, setBestProductArray] = useState({})

    let flag = true;



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

    if (cosineArray) {
        console.log(cosineArray)
        if (cosineArray[0] === 'None') {
            flag = false;
        }
    }
    console.log("flag: " + flag)
    console.log(cosineArray)

    let onMessageReceivedTwo = (msg) => {
        console.log('New Message Received (best)!!', msg);
        setBestProductArray(msg);
    }

    console.log(bestProductArray)

    return (
        <div>
            {flag && <CosineSimilarityRecommendation
                cosineArray={cosineArray}
                incrementProductCount={props.incrementProductCount}
                decrementProductCount={props.decrementProductCount}
                deleteProductFromCart={props.deleteProductFromCart}
                addProductInCart={props.addProductInCart}
            />}
            <BestProductsRecommendation
                bestProductArray={bestProductArray}
                incrementProductCount={props.incrementProductCount}
                decrementProductCount={props.decrementProductCount}
                deleteProductFromCart={props.deleteProductFromCart}
                addProductInCart={props.addProductInCart}
            />
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