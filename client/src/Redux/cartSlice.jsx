// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [], // {id, name, price, quantity, image}
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const dish = action.payload;
//       const existing = state.items.find((i) => i.id === dish.id);
//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         state.items.push({ ...dish, quantity: 1 });
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter((i) => i.id !== action.payload);
//     },
//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload;
//       const item = state.items.find((i) => i.id === id);
//       if (item) item.quantity = quantity;
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } =
//   cartSlice.actions;
// export default cartSlice.reducer;




import { createSlice } from "@reduxjs/toolkit";

// ---- LOAD CART FROM LOCALSTORAGE ----
const loadCart = () => {
  try {
    const data = localStorage.getItem("qr_cart");
    if (!data) return [];

    const parsed = JSON.parse(data);

    // Check time difference (30 mins = 1800000 ms)
    const isExpired = Date.now() - parsed.savedAt > 30 * 60 * 1000;
    if (isExpired) {
      localStorage.removeItem("qr_cart");
      return [];
    }

    return parsed.items || [];
  } catch {
    return [];
  }
};

// ---- SAVE CART TO LOCALSTORAGE ----
const saveCart = (items) => {
  localStorage.setItem(
    "qr_cart",
    JSON.stringify({
      items,
      savedAt: Date.now(),
    })
  );
};

const initialState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const dish = action.payload;
      const existing = state.items.find((i) => i.id === dish.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...dish, quantity: 1 });
      }

      saveCart(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveCart(state.items);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item) {
        item.quantity = quantity;
      }

      saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("qr_cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
