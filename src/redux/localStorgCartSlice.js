// this is for using localStorage....

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.prod_sku === product.prod_sku
      );

      if (existingItem) {
        if (existingItem.quantity < product.qty) {
          existingItem.quantity += 1;
        }
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeItemFromCart: (state, action) => {
      const productSku = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.prod_sku === productSku
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.prod_sku !== productSku
          );
        }
      }

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    updateCartFromStorage: (state) => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      state.cartItems = storedCart;
    },
  },
});

// export const { addItemToCart, removeItemFromCart, updateCartFromStorage } =
//   cartSlice.actions;

// export default cartSlice.reducer;
