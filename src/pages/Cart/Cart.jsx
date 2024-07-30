import React, { useEffect } from "react";
import "./Cart.scss";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotals, removeFromCart } from "../../toolkit/Cart/cartSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

useEffect(() => {
  dispatch(calculateTotals());
}, [cartItems, dispatch]);

const navigateHandler = () => {
  if (cartTotalAmount === 0) {
    toast.error("Savatingiz bo'sh");
  } else {
    navigate('/order')
  }
};

  return (
    <div className="cart">
      <div className="cart__items">
        <div className="cart__items-title">
          <p>Mahsulotlar</p>
          <p>Nomi</p>
          <p>Narxi</p>
          <p>Soni</p>
          <p>Hammasi</p>
          <p>O'chirish</p>
        </div>
        <br />
        <hr />
        {cartItems.length === 0 ? (
          <h1 className="empty">Savatingiz Bo'sh</h1>
        ) : (
          cartItems.map((item) => (
            <div key={item.id}>
              <div className="cart__item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.price}.000 so'm</p>
                <p>{item.cartQuantity}</p>
                <p>{item.cartQuantity * item.price}.000 so'm</p>
                <p className="cross" onClick={() => removeHandler(item.id)}>
                  x
                </p>
              </div>
              <hr />
            </div>
          ))
        )}
        <div className="cart__bottom">
          <div className="cart__bottom-total">
          <h2>Jami:</h2>
            <div className="cart__bottom-total--details">
              <p>Yetkazib berish hizmati:</p>
              <p>15.000 so'm</p>
              <hr />
            </div>
            <div className="cart__bottom-total--details">
              <p>Hammasi:</p>
              <p>{cartTotalAmount.toFixed(0)}.000 so'm</p>
              <hr />
              <hr />
            </div>
            <button onClick={navigateHandler}>Keyingi</button>
          </div>
          <div className="cart__bottom-promocode">
            <h2>Promokodni kiriting</h2>
            <input type="text" placeholder="Promokod" />
            <button >Tekshirish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
