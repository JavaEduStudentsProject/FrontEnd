import Review from "../review/Review";
import Modal from "../../forAuthorization/components/Modal";
import React, {useState} from "react";



const UserOrderItems = (props) => {
    const [modalActive, setModalActive] = useState(false)

    return (
        <div>
            <ul className="cart-list">
                        <li key={props.product.id}>
                            <div className="cart-list-item">
                                <div className="cart-list-item__header">
                                    <div className="cart-list-item__image">
                                        <img src={props.product.image}/>
                                    </div>
                                    <h4 className='cart-list-item__name'>{props.product.title}</h4>
                                </div>
                                <div>
                                    <span className="cart-list-item__count">{props.product.quantity}</span>
                                </div>
                                <span className="cart-list-item__count">{props.product.total}</span>
                                <span className="cart-list-item__count">{props.product.discountPercentage}</span>
                                <span
                                    className="cart-list-item__count">{props.product.discountedPrice * props.product.quantity}</span>
                                <button className="product-button-cart"
                                        onClick={() => setModalActive(true)}> Оставить отзыв
                                </button>
                            </div>
                        </li>
            </ul>
            <div>
                <Modal active={modalActive}
                       setActive={setModalActive}>
                    <div>
                        <Review product={props.product}/>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default UserOrderItems;