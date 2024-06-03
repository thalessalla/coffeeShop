import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  picture: string;
  quantity: number;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (
      state,
      action: PayloadAction<Omit<CartItem, "quantity" | "totalPrice">>
    ) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += existingItem.price;
        // state.totalPrice += existingItem.totalPrice;
        // console.log("Primeira adição");
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      state.totalQuantity += 1;
      state.totalPrice += newItem.price;
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity -= 1;
        state.totalQuantity -= 1;
        existingItem.totalPrice -= existingItem.price;
        state.totalPrice -= existingItem.price;
        if (existingItem.quantity < 1) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
    },
    removerProductCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

// Export the actions and the reducer
export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  removerProductCart,
} = cartSlice.actions;
export default cartSlice.reducer;
