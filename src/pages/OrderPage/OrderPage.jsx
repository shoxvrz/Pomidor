import React from "react";
import "./OrderPage.scss";
import { useGetAllDataQuery } from "../../toolkit/orders/ordersApi";
import { useSelector } from "react-redux";

const OrderPage = () => {
  const { error, isLoading, data } = useGetAllDataQuery();
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);

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
        {isLoading && <div className="loading">Yuklanmoqda...</div>}
        {error && (
          <div className="error">Xato: Ma'lumotlarni yuklab bo'lmadi</div>
        )}
        {data &&
          data.map((order, i) => (
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
              </div>
              {order.items.map((orderItem, id) => (
                <div
                  key={orderItem.id || id}
                  className="orderPage__main--card--orderList"
                >
                  <b>Ovqat nomi: {orderItem.name}</b>
                  <b>Narxi: {orderItem.price}.000 so'm</b>
                  <b>Soni: {orderItem.cartQuantity}</b>
                </div>
              ))}
            </div>
          ))}
      </div>
      <div className="orderPage__summary">
        <h2>Jami:</h2>
        <p>Yetkazib berish xizmati: 15.000 so'm</p>
        <p>Hammasi: {cartTotalAmount.toFixed(0)}.000 so'm</p>
      </div>
    </div>
  );
};

export default OrderPage;
