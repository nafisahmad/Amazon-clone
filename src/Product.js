import React, { useContext } from "react";
import "./Product.css";
// import { useStateValue } from "./StateProvider";
// import swal from "sweetalert";
import CurrencyFormat from "react-currency-format";
import { ProductBasketContext } from "./ProductBasketContext";


// function Product({ id, title, image, price, rating }) {
//   const [{ basket }, dispatch] = useStateValue();

//   // console.log("this is the basket >>>", basket);

//   const addToBasket = () => {
//     swal({
//       title: "Product Added to cart.",
//       icon: "success",
//       dangerMode: false,
//     });

//     //dispatch the item into the data layer
//     dispatch({
//       type: "ADD_TO_BASKET",
//       item: {
//         id: id,
//         title: title,
//         image: image,
//         price: price,
//         rating: rating,
//       },
//     });
//   };

  export default function Product({ id, title, image, price, rating }) {
    //Use Product Context to get and update List of Products in ProductContext Data Layer to show the numer of items in the basket in Header.js
    const [productBasket, setProductBasket] = useContext(ProductBasketContext);
 
    const addToBasket = (e) => {
       e.preventDefault();
 
       setProductBasket([
          ...productBasket,
          { id: id, 
            title: title, 
            price: price, 
            rating: rating, 
            image: image },
       ]);
    };
 

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>

        <p className="product__price">
          <small>₹ </small>
          <strong>
            <CurrencyFormat
              decimalScale={2}
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              thousandSpacing={"2s"}
              // prefix={"₹ "}
            />
          </strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToBasket}>Add to Cart</button>
    </div>
  );
}

// export default Product;
