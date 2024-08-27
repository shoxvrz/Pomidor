import React, { useState, useEffect } from "react";
import "./OrderPage.scss";
import { useGetAllDataQuery } from "../../toolkit/orders/ordersApi";
import axios from 'axios';
import {toast} from 'react-toastify'
import DeleteIcon from '@mui/icons-material/Delete';

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
              <b><span className="media__name">Ism:</span>{order.name}</b>
              <b><span className="media__name">Familiya:</span>{order.surname}</b>
              <b><span className="media__name">Email:</span>{order.email}</b>
              <b><span className="media__name">Tel:</span>{order.telNomer}</b>
              <b><span className="media__name">Davlat:</span>{order.country}</b>
              <b><span className="media__name">Shahar:</span>{order.city}</b>
              <b><span className="media__name">Tuman:</span>{order.tuman}</b>
              <b><span className="media__name">Postkod:</span>{order.postcode}</b>
              <b onClick={() => removeHandler(order.id)} style={{cursor: 'pointer' ,color: "red"}}><DeleteIcon/></b>
            </div>
            <div
         
              className="orderPage__main--card--orderList"
            >
            {order.items.map((orderItem, id) => (
                <div
                     key={orderItem.id || id} className="card">
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
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
