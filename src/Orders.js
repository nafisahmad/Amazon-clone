import React, { useState, useContext, useEffect } from "react";
import { db } from "./firebase";
import "./Orders.css";
import { AuthContext } from "./AuthContext";
import { ProductBasketContext } from "./ProductBasketContext";
// import { useStateValue } from "./StateProvider";
import Order from "./Order";

// function Orders() {
//   const [{ basket, user }, dispatch] = useStateValue();
const Orders = () => {
  //Var for orders
  const [orders, setOrders] = useState([]);

  //Load context vars
  const [user, setUser] = useContext(AuthContext);
  const [productBasket, setProductBasket] = useContext(ProductBasketContext);

  useEffect(() => {
    //If the user exists Pull the orders from the db
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div className="orders">
      {orders ? (
        <div>
          <h1>Your Orders</h1>

          <div className="orders__order">
            {orders?.map((order, index) => (
              <Order key={index} order={order} />
            ))}
          </div>
        </div>
      ) : (
        <h2>No orders</h2>
      )}
    </div>
  );
};
export default Orders;
