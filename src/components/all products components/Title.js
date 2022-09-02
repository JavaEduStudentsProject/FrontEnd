import React from "react";

const Title = (props)=>{
    if (props.subcategory){
        return  <h1>{props.subcategory}</h1>
    }
    if (props.category){
        return  <h1>{props.category}</h1>
    }

    else{
        return <h1>Все товары</h1>
    }
}

export default Title