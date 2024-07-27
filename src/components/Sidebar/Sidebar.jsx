import React, { useState } from "react";
import "./Sidebar.scss";
import { assets } from "../../admin_assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [clickedOption, setClickedOption] = useState('add')

  return (
    <div className="sidebar">
      <div className="sidebar__options">
        <NavLink
          to={'/admin/add'}
          onClick={() => setClickedOption('add')}
          className={clickedOption === 'add' ? 'activeOption' : 'sidebar__option'}
        >
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink
          to={'/admin/list'}
          onClick={() => setClickedOption('list')}
          className={clickedOption === 'list' ? 'activeOption' : 'sidebar__option'}
        >
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink
          to={'/admin/orderList'}
          onClick={() => setClickedOption('order')}
          className={clickedOption === 'order' ? 'activeOption' : 'sidebar__option'}
        >
          <img src={assets.order_icon} alt="" />
          <p>Order Items</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
