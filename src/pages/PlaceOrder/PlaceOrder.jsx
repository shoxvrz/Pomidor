import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import "./PlaceOrder.scss";
import { calculateTotals, clearCart } from "../../toolkit/Cart/cartSlice";
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);
  const [inputData, setInputData] = useState({
    name: '',
    surname: '',
    email: '',
    street: '',
    city: '',
    tuman: '',
    postcode: '',
    country: '',
    telNomer: ''
  });

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendingMessage = async () => {
    const isEmpty = Object.values(inputData).some(x => x === '');

    if (isEmpty) {
      toast.error("Bo'sh kataklarni to'ldiring");
      return;
    }

    const orderData = {
      ...inputData,
      items: cartItems,
    };

    try {
      const response = await axios.post('https://66b482189f9169621ea33d7a.mockapi.io/orders', orderData);
      if (response.status === 201) {
        toast.success('Buyurtmangiz muvaffaqiyatli qabul qilindi!');
        setInputData({
          name: '',
          surname: '',
          email: '',
          street: '',
          city: '',
          tuman: '',
          postcode: '',
          country: '',
          telNomer: ''
        });
        dispatch(clearCart());
      } else {
        toast.error("Buyurtma amalga oshmadi. Iltimos, yana bir bor urinib ko'ring.");
        console.error("Response status:", response.status);
      }
    } catch (error) {
      toast.error("Qaytadan urunib ko'ring");
      console.error("Error:", error);
    }
  };

  return (
    <div className="placeOrder">
      <div className="placeOrder__left">
        <p className="placeOrder__left-title">Buyurtma haqida malumot</p>
        <div className="placeOrder__left-multiFields">
          <input onChange={inputHandler} name="name" type="text" placeholder="Ismingiz" value={inputData.name} />
          <input onChange={inputHandler} name="surname" type="text" placeholder="Familyangiz" value={inputData.surname} />
        </div>
        <input onChange={inputHandler} name="email" type="email" placeholder="Emailingiz" value={inputData.email} />
        <input onChange={inputHandler} name="street" type="text" placeholder="Ko'changiz" value={inputData.street} />
        <div className="placeOrder__left-multiFields">
          <input onChange={inputHandler} name="city" type="text" placeholder="Shahar" value={inputData.city} />
          <input onChange={inputHandler} name="tuman" type="text" placeholder="Tuman" value={inputData.tuman} />
        </div>
        <div className="placeOrder__left-multiFields">
          <input onChange={inputHandler} name="postcode" type="text" placeholder="Postkod" value={inputData.postcode} />
          <input onChange={inputHandler} name="country" type="text" placeholder="Davlat" value={inputData.country} />
        </div>
        <input onChange={inputHandler} name="telNomer" type="text" placeholder="Telefon raqam" value={inputData.telNomer} />
      </div>
      <div className="placeOrder__right">
        <h2>Jami:</h2>
        <div className="cart__bottom-total--details placeOrder__right-details">
          <p>Yetkazib berish hizmati:</p>
          <p>15.000 so'm</p>
          <hr />
        </div>
        <div className="cart__bottom-total--details placeOrder__right-details">
          <p>Hammasi:</p>
          <p>{cartTotalAmount.toFixed(0)}.000 so'm</p>
          <hr />
          <hr />
        </div>
        <button onClick={sendingMessage}>Buyurtmani Jo'natish</button>
      </div>
    </div>
  );
};

export default PlaceOrder;
