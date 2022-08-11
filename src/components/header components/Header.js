import React from "react";


import img from "../../images/img_1.png";
import DropDownMenu from "./DropDownMenu";
import SearchField from "./SearchField";


export default function Header() {

    return (
        <header>
            <nav className="nav-panel">
                <img className="nav-img" src={img} />
                <DropDownMenu/>
                <SearchField/>
                <button className="nav-button-one">Кнопка 1</button>
                <button className="nav-button-two">Кнопка 2</button>
            </nav>
            <nav className="nav-list">
                <p>Крупные</p>
                <p>категории</p>
                <p>первого</p>
                <p>слоя</p>
                <p>вложенности</p>
                <a href="http://localhost:3000/">Все продукты</a>
                <a href="http://localhost:3000/product">Конкретный продукт</a>
            </nav>
        </header>
    )
}
