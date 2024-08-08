import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const { id } = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);

            if (existingItem) {
                existingItem.cartQuantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, cartQuantity: 1 });
            }

            state.cartTotalQuantity += 1;
            state.cartTotalAmount += action.payload.price;

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart(state, action) {
            const idToRemove = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== idToRemove);

            state.cartTotalAmount = state.cartItems.reduce((total, item) => total + item.price * item.cartQuantity, 0);
            state.cartTotalQuantity = state.cartItems.reduce((quantity, item) => quantity + item.cartQuantity, 0);

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        calculateTotals(state) {
            const { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity + 15;

                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;

                return cartTotal;
            }, { total: 0, quantity: 0 });

            state.cartTotalAmount = total;
            state.cartTotalQuantity = quantity;
        },
        decreaseCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem.id === action.payload.id
            );

            if(state.cartItems[itemIndex].cartQuantity > 1){
                 state.cartItems[itemIndex].cartQuantity -= 1;
            } else if(state.cartItems[itemIndex].cartQuantity === 1){
                state.cartItems = state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                );
            }

            state.cartTotalAmount = state.cartItems.reduce((total, item) => total + item.price * item.cartQuantity, 0);
            state.cartTotalQuantity = state.cartItems.reduce((quantity, item) => quantity + item.cartQuantity, 0);

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart(state) {
            state.cartItems = [];
            state.cartTotalAmount = 0;
          },
          discountCart(state) {
            const discount = 15;
            state.cartTotalAmount -= discount;
            localStorage.setItem('cartTotalAmount', JSON.stringify(state.cartTotalAmount));
          }
          
        
    },
});

export const { addToCart, removeFromCart, calculateTotals, decreaseCart , clearCart , discountCart} = cartSlice.actions;

export default cartSlice.reducer;
