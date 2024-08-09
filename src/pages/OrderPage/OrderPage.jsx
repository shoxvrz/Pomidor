import React, { useState, useEffect } from "react";
import "./OrderPage.scss";
import { useGetAllDataQuery } from "../../toolkit/orders/ordersApi";
import axios from 'axios';
import {toast} from 'react-toastify'

const OrderPage = () => {
  const { error, isLoading, data } = useGetAllDataQuery();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  const removeHandler = async (id) => {
    try {
      await axios.delete(`https://66b482189f9169621ea33d7a.mockapi.io/orders/${id}`);
      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      toast.error("Failed to delete order:", error);
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
          <b>O'chirish</b>
        </div>
        {isLoading && <div className="loading">Yuklanmoqda...</div>}
        {error && (
          <div className="error">Xato: Ma'lumotlarni yuklab bo'lmadi</div>
        )}
        {orders.map((order, i) => (
          <div key={order.id || i} className="orderPage__main--card">
            <div className="orderPage__main--card--userInfo">
              <b>{order.name}</b>
              <b>{order.surname}</b>
              <b>{order.email}</b>
              <b>{order.telNomer}</b>
              <b>{order.country}</b>
              <b>{order.city}</b>
              <b>{order.tuman}</b>
              <b>{order.postcode}</b>
              <b onClick={() => removeHandler(order.id)} style={{cursor: 'pointer'}}>X</b>
            </div>
            {order.items.map((orderItem, id) => (
              <div
                key={orderItem.id || id}
                className="orderPage__main--card--orderList"
              >
                <div className="card">
                  <div>
                    <b>Ovqat nomi:</b>
                    <b>{orderItem.name}</b>
                  </div>
                  <div>
                    <b>Narxi:</b>
                    <b>{orderItem.price}.000 so'm</b>
                  </div>
                  <div>
                    <b>Soni:</b>
                    <b>{orderItem.cartQuantity}</b>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
