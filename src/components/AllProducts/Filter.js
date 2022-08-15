import React from 'react';

const Filter = () => {
    return (
        <fieldset className="filter">
            <legend>Фильтр по характеристикам</legend>
            <h3>Категории</h3>
            <div>
                <input type="checkbox" id="robots" name="robots"/>
                    <label htmlFor="robots">Robots</label>
            </div>

            <div>
                <input type="checkbox" id="tables" name="tables"/>
                    <label htmlFor="tables">Tables</label>
            </div>

            <h3>Цена</h3>
            <div>
                <input type="checkbox" id="low" name="low"/>
                <label htmlFor="low">0 - 500</label>
            </div>

            <div>
                <input type="checkbox" id="medium" name="medium"/>
                <label htmlFor="medium">501 - 2000</label>
            </div>

            <div>
                <input type="checkbox" id="expensive" name="expensive"/>
                <label htmlFor="expensive">> 2000</label>
            </div>
        </fieldset>
    );
};

export default Filter;