import Review from "../review/Review";

const UserOrderItems = (props) => {


    return (
        <div>

            <img src={props.product.image}/>
            <h3>{props.product.title}</h3>
            <Review product={props.product}/>

        </div>
    );
};

export default UserOrderItems;