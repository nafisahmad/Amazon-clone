import { useContext } from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
// import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
// import userEvent from "@testing-library/user-event";
import { ProductBasketContext } from "./ProductBasketContext";
import { AuthContext } from "./AuthContext";

// function Checkout() {
//   const [{ basket, user }, dispatch] = useStateValue();
const Checkout = () => {
  const [productBasket] = useContext(ProductBasketContext);
  const [user, setUser] = useContext(AuthContext);

  return (
    <div className="checkout">
      {/* <h1>Checkout page</h1> */}

      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/Jupiter21/Bank/Phase-4/update/Bank_PC__1500x90_3.jpg"
          alt=""
        />
        <img
          className="checkout__ad"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Events/Jupiter21P1/pay_stripe_desk.png"
          alt=""
        />

        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your shopping Cart</h2>
          {/* {basket.map((item) => ( */}
          {productBasket.map((product, index) => (
            <CheckoutProduct
              key={index}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </div>
      </div>

      <div className="checkout__right">
        {/* subtotal */}
        <Subtotal />
        {/* <h2>subtotal here</h2> */}
      </div>
    </div>
  );
};

export default Checkout;
