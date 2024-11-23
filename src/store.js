import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Slices/AddToCart/AddToSlice'
import productReducer from './Slices/Products/products'


export const store = configureStore({
    reducer:{
        counter:counterReducer,
        products:productReducer,
    }
})