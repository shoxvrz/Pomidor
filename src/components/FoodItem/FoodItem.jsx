import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.scss";
import { useDispatch } from 'react-redux';
import { addToCart, decreaseCart } from '../../toolkit/Cart/cartSlice'; 

const FoodItem = ({ id, image, name, description, price }) => {
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = useState(0);

  const add = () => {
    const item = { id, name, description, price, image };
    dispatch(addToCart(item));
    setItemCount((prev) => prev + 1);
  };

  const remove = () => {
    const item = { id, name, description, price, image };
    dispatch(decreaseCart(item))
    setItemCount((prev) => prev - 1);
  };

  return (
    <div className="foodItem">
      <div className="foodItem__imgCont">
        <img className="image" src={image} alt="" />
        {!itemCount ? (
          <img
            className="addBtn"
            onClick={add}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="foodItem__imgCont-counter">
            <img
              onClick={remove}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{itemCount}</p>
            <img
              onClick={add}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="foodItem__info">
        <div className="foodItem__info-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="foodItem__info-desc">{description}</p>
        <p className="foodItem__info-price">{price}.000 so'm</p>
      </div>
    </div>
  );
};

export default FoodItem;
