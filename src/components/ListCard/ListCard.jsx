import React from "react";
import "./ListCard.scss";

const ListCard = ({ image, price, category, name, onEdit, onDelete }) => {
  return (
    <div className="listCard">
      <img src={image} alt={name} />
      <p>{name}</p>
      <p>{category}</p>
      <p>{price}.000</p>
      <p className="xx" onClick={onDelete}>X</p>
      {/* <button className="xx" style={{ cursor: "pointer" }} onClick={onEdit}>
        E
      </button> */}
    </div>
  );
};

export default ListCard;
