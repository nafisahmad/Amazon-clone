// import React from "react";
import "./CheckoutProduct.css";
// import { useStateValue } from "./StateProvider";
// import swal from "sweetalert";
import { useContext } from "react";
import { ProductBasketContext } from "./ProductBasketContext";

// function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
//   const [{ basket }, dispatch] = useStateValue();
//   const removeFromBasket = () => {

//     swal({
//       title: "Product removed from cart.",
//       icon: "success",
//       dangerMode: true,
//     })
//     //   remove the item from the cart
//     dispatch({
//         type: 'REMOVE_FROM_BASKET',
//         id: id,
//     })
//   };

const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {
  const [productBasket, setProductBasket] = useContext(ProductBasketContext);

  const removeProductFromBasket = () => {
    const index = productBasket.findIndex((product) => product.id === id);
    if (index > -1) {
      let newBasket = [...productBasket];
      newBasket.splice(index, 1);
      setProductBasket(newBasket);
    } else {
      console.warn(`Cant remove product with id: ${id} from basket`);
    }
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt=" "/>
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>₹ </small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        {!hideButton && ( <button onClick={removeProductFromBasket}>Remove</button>)}
      </div>
    </div>
  );
};

export default CheckoutProduct;
