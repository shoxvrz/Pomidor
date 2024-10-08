import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchItem } from "../../toolkit/SearchItem/SearchItem";  // Adjust path as necessary
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const Navbar = ({ setShowLogin }) => {
  const [underLine, setUnderLine] = useState("home");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);
  const [searchDiv, setSearchDiv] = useState(false);
  const searchQuery = useSelector((state) => state.search.searchedItem);

  const searchHandler = () => {
    setSearchDiv((prev) => !prev);
  };

  const inputHandler = (e) => {
    const { value } = e.target;
    dispatch(searchItem(value));
  };

  return (
    <div id="navbar" className="navbar">
      <img
        onClick={() => navigate("/")}
        className="navbar__logo"
        src={assets.logo}
        alt=""
      />

      <ul className="navbar__menu">
        <Link
          to="/"
          onClick={() => setUnderLine("home")}
          className={underLine === "home" ? "active" : ""}
        >
          Bosh Sahifa
        </Link>

        <a
          href="#expMenu"
          onClick={() => setUnderLine("menu")}
          className={underLine === "menu" ? "active" : ""}
        >
          Menyu
        </a>

        <a
          href="#appDownload"
          onClick={() => setUnderLine("mobile-app")}
          className={underLine === "mobile-app" ? "active" : ""}
        >
          Mobil-versiya
        </a>

        <a
          href="#footer"
          onClick={() => setUnderLine("contact-us")}
          className={underLine === "contact-us" ? "active" : ""}
        >
          Biz bilan bog'laning
        </a>
      </ul>
      <div className="navbar__media">
        <div className="basketIcon">

        <ShoppingBasketIcon
               className="media-icon"
               style={{ cursor: "pointer" }}
               onClick={() => navigate("/cart")}
               src={assets.basket_icon}
               alt=""
               sx={{
                fontSize: "38px",
                color: "#49557e",
               }}
        />
        {cartItems.length === 0 ? null : (
          <div className="basketIcon-dot"></div>
        )}
        </div>
        <span
          className="navbar__profile-text"
          onClick={() => setShowLogin(true)}
        >
          <PersonIcon
            sx={{
              fontSize: "38px",
              color: "#49557e",
            }}
          />
        </span>
      </div>
      <div className="navbar__right">
        {searchDiv && (
          <input
            onChange={inputHandler}
            className="searchInput"
            type="text"
            value={searchQuery}
          />
        )}
        <img
          onClick={searchHandler}
          className="search"
          style={{ cursor: "pointer" }}
          src={assets.search_icon}
          alt=""
        />
        <div className="navbar__right-icon">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/cart")}
            src={assets.basket_icon}
            alt=""
          />
          {cartItems.length === 0 ? null : (
            <div className="navbar__right-icon--dot"></div>
          )}
        </div>
        {user ? (
          <div className="navbar__profile">
            <span
              className="navbar__profile-text"
              onClick={() => setShowLogin(true)}
            >
              <PersonIcon
                sx={{
                  fontSize: "38px",
                  color: "#49557e",
                }}
              />
            </span>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Kirish</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
