import React, { useContext } from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
// import { useStateValue } from "./StateProvider";
// import { getBasketTotal } from "./reducer";
import {
  ProductBasketContext,
  getBasketTotalPrice,
} from "./ProductBasketContext";
import { useHistory } from "react-router-dom";

// function Subtotal() {
//   const history = useHistory();
//   const [{ basket }, dispatch] = useStateValue();

const SubTotal = () => {
  const [productBasket] = useContext(ProductBasketContext);

  //Get browser history
  const history = useHistory();

  const redirectToPaymentPage = (e) => {
    history.push("/payment");
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal: ({productBasket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotalPrice(productBasket)}
        displayType={"text"}
        thousandSeparator={true}
        thousandSpacing={"2s"}
        prefix={"₹ "}
      />

      {/* <button onClick={(e) => history.push("/payment")}> */}
      <button onClick={redirectToPaymentPage}>Proceed to Checkout</button>
    </div>
  );
};

export default SubTotal;
