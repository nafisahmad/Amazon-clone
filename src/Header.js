import React, { useContext } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
// import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingBasket';
import { Link, useHistory } from "react-router-dom";
// import { useStateValue } from "./StateProvider";
import { ProductBasketContext } from "./ProductBasketContext";
import { AuthContext } from "./AuthContext";
import { auth } from "./firebase";

function Header() {
  // const [{ basket, user }, dispatch] = useStateValue();
  // const handleAuthentication = () => {

  //Pull the products list from ProductContext using the useContext
  const [productBasket] = useContext(ProductBasketContext);
  const history = useHistory();

  //Pull user from Auth Context
  const [user, setUser] = useContext(AuthContext);

  //Function to handle authentication in header
  const handleAuthentication = () => {
    if (user) {
      //sign out
      auth.signOut();
      //Redirect to login Page
      history.push("/login");
    }
  };
  return (
    <div class="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon logo"
        />
      </Link>
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
        {/* Logo */}
      </div>

      <div className="header__nav">
        {/* signin */}
        <Link to={!user && "/login"}>
          {" "}
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              Hello, {!user ? "Guest" : user.email}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        {/* Return & orders */}
        <Link to="/orders">
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        </Link>
        {/* prime */}
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {productBasket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
