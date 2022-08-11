import React from 'react';

function DropDownMenu() {
    return (
        <div className="dropdown">
            <button className="dropbtn">Каталог</button>
            <div className="dropdown-content">
                <a href="#">Категория 1</a>
                <a href="#">Категория 2</a>
                <a href="#">Категория 3</a>
            </div>
        </div>
    );
};

export default DropDownMenu;