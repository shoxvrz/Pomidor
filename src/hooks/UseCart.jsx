import { useSelector, useDispatch } from "react-redux";
import { calculateTotals, discountCart, removeFromCart } from "../toolkit/Cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

const UseCart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputPromo, setInputPromo] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState(cartTotalAmount);
  const [promoUsed, setPromoUsed] = useState(false); // Track if promo is used

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Taom muvaffaqiyatli savatdan o'chirildi");
  };

  const discountActive = () => {
    if (promoUsed) {
      toast.error("Promokod faqat bir marta ishlatilishi mumkin.");
      return;
    }

    if (cartTotalAmount >= 45) {
      if (inputPromo === 'POMIDOR777') {
        toast.success("Promokod qo'llanildi!");
        const discount = 15; 
        setDiscountedTotal(cartTotalAmount - discount);
        dispatch(discountCart()); 
        setPromoUsed(true); 
      } else {
        toast.error("Noto'g'ri promokod");
      }
    } else {
      toast.error("Promokoddan foydalanish uchun umumiy summa 45,000 so'mdan oshishi kerak.");
    }
  };

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  useEffect(() => {
    setDiscountedTotal(cartTotalAmount);
  }, [cartTotalAmount]);

  const navigateHandler = () => {
    if (discountedTotal <= 0) {
      toast.error("Savatingiz bo'sh");
    } else {
      navigate("/order");
    }
  };

  return {
    removeHandler,
    navigateHandler,
    discountActive,
    cartItems,
    discountedTotal,
    setInputPromo
  };
};

export default UseCart;
