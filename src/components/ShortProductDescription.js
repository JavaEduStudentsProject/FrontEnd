import React, {useState} from 'react';
import MainCharacteristics from "./MainCharacteristics";
import StarRating from "./StarRating";

const ShortProductDescription = () => {
    let averageRating = 4.5;
    const [characteristics, setCharacteristics] = useState([
        {id: 1, title: "Страна производства", value: "Китай"},
        {id: 2, title: "Производитель", value: "Samsung"},
        {id: 3, title: "Цвет", value: "темно-серый"},
        {id: 4, title: "Емкость аккумуляторов", value: "24 часа"},
        {id: 5, title: "Рейтинг", value: averageRating}
    ])

    return (
        <div className="short-descr">
            <h4>Короткое описание товара. Характеристики для фильтров</h4>
            <ul className="main-characts">
            {characteristics.map(characteristic =>
                <MainCharacteristics characteristic = {characteristic} key={characteristic.id}/>
            )}
            </ul>
            <StarRating/>
        </div>
    );
};

export default ShortProductDescription;