import React, { useEffect, useState } from "react";
import "./Cart.scss";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotals, discountCart, removeFromCart } from "../../toolkit/Cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputPromo, setInputPromo] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState(cartTotalAmount);

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const discountActive = () => {
    if (inputPromo === 'POMIDOR777') {
      toast.success("Promokod qo'llanildi!");
      const discount = 15; 
      const newTotal = cartTotalAmount - discount;
      setDiscountedTotal(newTotal);
      dispatch(discountCart());  
    } else {
      toast.error("No'tog'ri promokod");
    }
  };
  
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  useEffect(() => {
    setDiscountedTotal(cartTotalAmount);
  }, [cartTotalAmount]);

  const navigateHandler = () => {
    if (discountedTotal === 0) {
      toast.error("Savatingiz bo'sh");
    } else {
      navigate("/order", { state: { discountedTotal } });
    }
  };
  
  

  const promoHandler = () => {
    if (inputPromo === "POMIDOR777") {
      const discount = 15; // Assume a discount of 15,000 so'm
      setDiscountedTotal(cartTotalAmount - discount);
      toast.success("Promokod qo'llanildi!");
    } else {
      toast.error("Noto'g'ri promokod");
    }
  };

  return (
    <div className="cart">
      <div className="cart__items">
        <div className="cart__items-title">
          <p>Mahsulotlar</p>
          <p>Nomi</p>
          <p>Narxi</p>
          <p>Soni</p>
          <p>Hammasi</p>
          <p>O'chirish</p>
        </div>
        <br />
        <hr />
        {cartItems.length === 0 ? (
          <h1 className="empty">Savatingiz Bo'sh</h1>
        ) : (
          cartItems.map((item) => (
            <div key={item.id}>
              <div className="cart__item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.price}.000 so'm</p>
                <p>{item.cartQuantity}</p>
                <p>{item.cartQuantity * item.price}.000 so'm</p>
                <p className="cross" onClick={() => removeHandler(item.id)}>
                  x
                </p>
              </div>
              <hr />
            </div>
          ))
        )}
        <div className="cart__bottom">
          <div className="cart__bottom-total">
            <h2>Jami:</h2>
            <div className="cart__bottom-total--details">
              <p>Yetkazib berish hizmati:</p>
              <p>15.000 so'm</p>
              <hr />
            </div>
            <div className="cart__bottom-total--details">
              <p>Hammasi:</p>
              <p>{discountedTotal.toFixed(0)}.000 so'm</p>
              <hr />
              <hr />
            </div>
            <button onClick={navigateHandler}>Keyingi</button>
          </div>
          <div className="cart__bottom-promocode">
            <h2>Promokodni kiriting</h2>
            <input
              onChange={(e) => setInputPromo(e.target.value)}
              type="text"
              placeholder="Promokod"
            />
            <button onClick={discountActive}>Tekshirish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
