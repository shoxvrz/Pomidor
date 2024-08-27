import React, { useState } from "react";
import "./Sidebar.scss";
import { assets } from "../../admin_assets/assets";
import { NavLink } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const Sidebar = () => {
  const [clickedOption, setClickedOption] = useState("add");

  return (
    <div className="sidebar">
      <div className="sidebar__options">
        <NavLink
          to={"/admin/add"}
          onClick={() => setClickedOption("add")}
          className={
            clickedOption === "add" ? "activeOption" : "sidebar__option"
          }
        >
          <PlaylistAddIcon style={{fontSize: '25px'}}/>
          <p className="name">Add Items</p>
        </NavLink>
        <NavLink
          to={"/admin/list"}
          onClick={() => setClickedOption("list")}
          className={
            clickedOption === "list" ? "activeOption" : "sidebar__option"
          }
        >
          <FormatListBulletedIcon style={{fontSize: '25px'}} />
          <p className="name">List Items</p>
        </NavLink>
        <NavLink
          to={"/admin/orderList"}
          onClick={() => setClickedOption("order")}
          className={
            clickedOption === "order" ? "activeOption" : "sidebar__option"
          }
        >
          <PlaylistAddCheckIcon style={{fontSize: '25px'}} />
          <p className="name">Order Items</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
