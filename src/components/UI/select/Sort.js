import MySelect from "./MySelect";
import React, {useContext, useState} from "react";
import {Context} from "../../Context";

const Sort = (props) =>{

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

    const paginationProducts = (field) => {
        setSortingKey(field);
        props.setPerPage(Number(field))
    }

    if (props.category) {
        return null
    }
    else {
        return (
            <div>
            <MySelect
        value={sortingKey}
        onChange={sortProducts}
        defaultValue="Сортировка по"
        options={[
            {value: 'id', name: "По id"},
            {value: 'category', name: "По категории"},
            {value: 'price', name: "По цене"},
        ]}/>

        <MySelect value={sortingKey}
                  onChange={paginationProducts}
                  defaultValue="5"
                  options={[
                      {value: '10', name: "10"},
                      {value: '50', name: "50"},
                      {value: `-1`, name: "Показать все"},
                  ]} />
            </div>
    )

    }
}

export default Sort