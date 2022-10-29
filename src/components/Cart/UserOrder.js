import UserOrderItems from "./UserOrderItems";

import React from "react";


const UserOrder = (props) => {


    // const userOrders=Object.values(filteredOrders)
// const  filteredOrders = allOrdersFromDB.filter(order => order.userId === user.id)

    // const itemsInOrder = Object.keys(props.order)
    //
      const products =Object.values(props.order)
    console.log(props.order)
    console.log(products)

    return (
        <div>
            {products.map(el => (
                <UserOrderItems key={el.id} product={el}
                />
            ))}
        </div>
    );
};

export default UserOrder;