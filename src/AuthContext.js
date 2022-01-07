import React, { useState, createContext } from "react";

//Create context(Data Layer); This context will be imported and used in the components that are wrapped up by the provider
export const AuthContext = createContext();

//Wrap up the provider to all components of our app that want access to the products list
export const AuthProvider = (props) => {
   const [user, setUser] = useState(null);

   //Wrap up to all children components have access to prop user and setUser setter
   return (
      <AuthContext.Provider value={[user, setUser]}>
         {props.children}
      </AuthContext.Provider>
   );
};
