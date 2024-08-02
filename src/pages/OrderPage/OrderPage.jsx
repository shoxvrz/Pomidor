import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderPage.scss";

const OrderPage = () => {
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/orders");
      setOrderData(response.data);
    } catch (err) {
      setError("An error occurred while fetching orders.");
    }
  };

  return (
    <div className="orderPage">
      <div className="orderPage__top">
        <h1>Buyurtmalar</h1>
      </div>
      <div className="orderPage__main">
        <div className="orderPage__main--top">
          <b>Ismi</b>
          <b>Familiya</b>
          <b>Email</b>
          <b>Telefon Raqam</b>
          <b>Davlat</b>
          <b>Shahar</b>
          <b>Tuman</b>
          <b>Postkod</b>
          <b>Ovqat nomi</b>
          <b>Narxi</b>
          <b>Soni</b>
        </div>
        {error && <div className="error">{error}</div>}
        {orderData.map((order, i) => (
          <div key={i} className="orderPage__main--card">
            <div className="orderPage__main--card--userInfo">
              <b>{order.name}</b>
              <b>{order.surname}</b>
              <b>{order.email}</b>
              <b>{order.telNomer}</b>
              <b>{order.country}</b>
              <b>{order.city}</b>
              <b>{order.tuman}</b>
              <b>{order.postcode}</b>
            </div>
            {order.items.map((orderItem, id) => (
              <div key={id} className="orderPage__main--card--orderList">
                <b>Ovqat nomi: {orderItem.name}</b>
                <b>Narxi: {orderItem.price}.000 so'm</b>
                <b>Soni: {orderItem.cartQuantity}</b>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
