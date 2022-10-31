import React from 'react';
import RatingService from "../../services/RatingService";

export default function StarRating() {

    return (
        <>
        <form id="form" action="#" className="star-form">
        <div className="star-rating">
            <div className="star-items">
                <input id="star-radio_1" className="star-radio-item" name="star-radio" type="radio" value="5"/>
                <label htmlFor="star-radio_1" className="star-label"></label>
                <input id="star-radio_2" className="star-radio-item" name="star-radio" type="radio" value="4"/>
                <label htmlFor="star-radio_2" className="star-label"></label>
                <input id="star-radio_3" className="star-radio-item" name="star-radio" type="radio" value="3"/>
                <label htmlFor="star-radio_3" className="star-label"></label>
                <input id="star-radio_4" className="star-radio-item" name="star-radio" type="radio" value="2"/>
                <label htmlFor="star-radio_4" className="star-label"></label>
                <input id="star-radio_5" className="star-radio-item" name="star-radio" type="radio" value="1"/>
                <label htmlFor="star-radio_5" className="star-label"></label>
            </div>
        </div>
        </form>
        </>
);
};