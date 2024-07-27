import React from 'react'
import './ListCard.scss'

const ListCard = ({image, price, category, name, onEdit, onDelete }) => {
  return (
    <div className="listCard">
    <img
      src={image}
      alt={name}
    />
    <p>{name}</p>
    <p>{category}</p>
    <p>{price}.000</p>
    <p onClick={onDelete}>X</p>
    <p onClick={onEdit}>E</p>
    </div> 
  )
}



export default ListCard