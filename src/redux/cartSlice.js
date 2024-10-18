import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
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
    },

    updateCartItems: (state, action) => {
      // Replaces the entire cart with the updated cartItems array
      state.cartItems = action.payload;
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
