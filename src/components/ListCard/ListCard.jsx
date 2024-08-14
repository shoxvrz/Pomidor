import React from "react";
import "./ListCard.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const ListCard = ({ image, price, category, name, onEdit, onDelete, id }) => {
  return (
    <div className="listCard">
      <div>
        <img src={image || "default-image-url"} alt={name} />
      </div>
      <div>
        <p>{name}</p>
      </div>
      <div>
        <p>{category}</p>
      </div>
      <div>
        <p>{price}.000</p>
      </div>
      <div className="listCard__last">
        <Link to={`/admin/changeInfo/${id}`}>
          <EditIcon
            sx={{
              color: "green",
              cursor: "pointer",
              fontSize: '23px'
            }}
            onClick={onEdit}
          />
        </Link>
        <Link>
        
        <DeleteIcon
          sx={{
            color: "red",
            cursor: "pointer",
            fontSize: '23px'
          }}
          onClick={onDelete}
        />
        </Link>
      </div>
    </div>
  );
};

export default ListCard;
