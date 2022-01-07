import React, { useState, createContext } from "react";

//Create context(Data Layer); This context will be imported and used in the components that are wrapped up by the provider
export const ProductBasketContext = createContext();

//Wrap up the provider to all components of our app that want access to the products list
export const ProductProvider = (props) => {
   const [productBasket, setProductBasket] = useState([]);

   //Wrap up to all children components
   return (
      <ProductBasketContext.Provider value={[productBasket, setProductBasket]}>
         {props.children}
      </ProductBasketContext.Provider>
   );
};

//Selector to Calcular Total Price of the products in the basket and show it in subTotal Component
export const getBasketTotalPrice = (basket) => {
   return basket?.reduce((amount, item) => item.price + amount, 0);
};
