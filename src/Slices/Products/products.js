import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    isToast: false,
    isProductAdd: false,
  },
  reducers: {
    //function or reducers
    addProduct: (state, action) => {
      const isExist = state.items.find((item) => item.id === action.payload.id);
      if (isExist) {
        state.isToast = true;
      } else {
        state.isToast = false;
        state.isProductAdd= true;
        state.items.push({ ...action.payload, quantity: 1 });
       
      }
    },
    increaseQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
     if (product) {
      product.quantity+=1;
     }
     
     
      console.log(product);
    },
    decreaseQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
     if (product && product.quantity>1) {
      product.quantity-=1;
     }else{
      state.items=state.items.filter(item=> item.id !== action.payload.id);
     }
     
    },
    removeItem:(state,action)=>{
      state.items =state.items .filter((item)=>item?.id !== action.payload.id)
    }
  },
});

export const { addProduct, increaseQuantity,decreaseQuantity ,removeItem} = productsSlice.actions;
export default productsSlice.reducer;
