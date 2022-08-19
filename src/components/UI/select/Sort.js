import MySelect from "./MySelect";
import React, {useContext, useState} from "react";
import {Context} from "../../Context";

const Sort= ({category})=>{

    const [products, setProducts] = useContext(Context);

    const [sortingKey, setSortingKey] = useState("");
    const [directSort, setDirectSort] = useState(true);

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

    if (category) {
        return null
    }
    else {
        return <MySelect
        value={sortingKey}
        onChange={sortProducts}
        defaultValue="Сортировка по"
        options={[
            {value: 'id', name: "По id"},
            {value: 'category', name: "По категории"},
            {value: 'price', name: "По цене"},
        ]}
    />}
}

export default Sort