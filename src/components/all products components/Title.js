import React from "react";

const Title = ({category})=>{
    if (category){
        return  <h1>{category}</h1>
    }
    else{
        return <h1>Все товары</h1>
    }
}

export default Title