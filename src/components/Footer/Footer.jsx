import React from "react";
import { assets } from "../../assets/assets";
import './Footer.scss'
import { Link, NavLink, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="footer" id="footer">
      <div className="footer__content">
        <div className="footer__content-left">
          <img href='#navbar' className="logo" src={assets.logo} alt="" />
          <a href="#navbar">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            nihil corporis ipsa, quasi obcaecati quis temporibus debitis odio
            nostrum repellendus enim veniam dolorem illum alias magnam
            distinctio assumenda explicabo eius.
          </a>
          <div className="footer__content-left-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer__content-center">
          <h2>KOMPANIYA</h2>
          <ul className="footer__content-center-gap">
            <li>Bosh sahifa</li>
            <li>Biz haqimizda</li>
            <li>Yetkazib berish</li>
            <li>Maxfiylik siyosati</li>
          </ul>
        </div>
        <div className="footer__content-right">
          <h2>BOG'LANING</h2>
          <ul className="footer__content-center-gap">
            <li>+998-91-506-04-63</li>
            <li>shoxruzabdurasulov7@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer__copyright">
        Mualliflik huquqi 2024 @ Pomidor.com - Barcha huquqlar himoyalangan
      </p>
    </div>
  );
};

export default Footer;
