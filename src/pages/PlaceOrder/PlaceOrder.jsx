import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import "./PlaceOrder.scss";
import { calculateTotals, clearCart } from "../../toolkit/Cart/cartSlice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { sendTgMessage } from "../../service/api";
import { useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);
  const location = useLocation();
  const discountedTotal = location.state?.discountedTotal || cartTotalAmount;
  const [errors, setErrors] = useState({});

  const [inputData, setInputData] = useState({
    name: "",
    surname: "",
    email: "",
    street: "",
    city: "",
    tuman: "",
    postcode: "",
    country: "",
    telNomer: "",
    price: discountedTotal,
  });

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "", // Clear error when user starts typing
    }));
  };

  const phoneInputHandler = (phone) => {
    setInputData((prev) => ({
      ...prev,
      telNomer: phone,
    }));
    setErrors((prev) => ({
      ...prev,
      telNomer: "", // Clear error when user starts typing
    }));
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!inputData.name) newErrors.name = "Ismingizni kiriting!";
    if (!inputData.surname) newErrors.surname = "Familiyangizni kiriting!";
    if (!inputData.email) newErrors.email = "Emailingizni kiriting!";
    if (!inputData.street) newErrors.street = "Ko'chani kiriting!";
    if (!inputData.city) newErrors.city = "Shaharni kiriting!";
    if (!inputData.tuman) newErrors.tuman = "Tumanni kiriting!";
    if (!inputData.postcode) newErrors.postcode = "Postkodni kiriting!";
    if (!inputData.country) newErrors.country = "Davlatni kiriting!";
    if (!inputData.telNomer) newErrors.telNomer = "Telefon raqamni kiriting!";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const {
    mutate: placeOrder,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async (orderData) => {
      await axios.post(
        "https://66b482189f9169621ea33d7a.mockapi.io/orders",
        orderData
      );
      await sendTgMessage(orderData);
    },
    onSuccess: () => {
      toast.success("Buyurtmangiz muvaffaqiyatli qabul qilindi!");
      setInputData({
        name: "",
        surname: "",
        email: "",
        street: "",
        city: "",
        tuman: "",
        postcode: "",
        country: "",
        telNomer: "",
        price: discountedTotal,
      });
      dispatch(clearCart());
    },
    onError: () => {
      toast.error(
        "Buyurtma amalga oshmadi. Iltimos, yana bir bor urinib ko'ring."
      );
    },
  });

  const sendingMessage = () => {
    if (validateInputs()) {
      const orderData = {
        ...inputData,
        items: cartItems,
      };

      placeOrder(orderData);
      navigate("/");
    } else {
      toast.error("Bo'sh kataklarni to'ldiring");
    }
  };

  return (
    <div className="placeOrder">
      <div className="placeOrder__left">
        <p className="placeOrder__left-title">Buyurtma haqida ma'lumot</p>
        <div className="placeOrder__left-multiFields">
          <input
            onChange={inputHandler}
            name="name"
            type="text"
            placeholder="Ismingiz"
            value={inputData.name}
            className={errors.name ? "input-error" : ""}
          />
          <input
            onChange={inputHandler}
            name="surname"
            type="text"
            placeholder="Familyangiz"
            value={inputData.surname}
            className={errors.surname ? "input-error" : ""}
          />
        </div>
        <input
          onChange={inputHandler}
          name="email"
          type="email"
          placeholder="Emailingiz"
          value={inputData.email}
          className={errors.email ? "input-error" : ""}
        />
        <input
          onChange={inputHandler}
          name="street"
          type="text"
          placeholder="Ko'changiz"
          value={inputData.street}
          className={errors.street ? "input-error" : ""}
        />
        <div className="placeOrder__left-multiFields">
          <input
            onChange={inputHandler}
            name="city"
            type="text"
            placeholder="Shahar"
            value={inputData.city}
            className={errors.city ? "input-error" : ""}
          />
          <input
            onChange={inputHandler}
            name="tuman"
            type="text"
            placeholder="Tuman"
            value={inputData.tuman}
            className={errors.tuman ? "input-error" : ""}
          />
        </div>
        <div className="placeOrder__left-multiFields">
          <input
            onChange={inputHandler}
            name="postcode"
            type="text"
            placeholder="Postkod"
            value={inputData.postcode}
            className={errors.postcode ? "input-error" : ""}
          />
          <input
            onChange={inputHandler}
            name="country"
            type="text"
            placeholder="Davlat"
            value={inputData.country}
            className={errors.country ? "input-error" : ""}
          />
        </div>
        <PhoneInput
          inputStyle={{ width: "100%" }}
          name="telNomer"
          country={"uz"}
          value={inputData.telNomer}
          onChange={phoneInputHandler}
          placeholder="Telefon raqam"
          containerClass={errors.telNomer ? "input-error" : ""}
        />
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
          <p>{discountedTotal.toFixed(0)}.000 so'm</p>
          <hr />
          <hr />
        </div>
        <button onClick={sendingMessage} disabled={isLoading}>
          Buyurtma Qilish
        </button>
        {isError && <p className="error">Xatolik yuz berdi</p>}
      </div>
    </div>
  );
};

export default PlaceOrder;
