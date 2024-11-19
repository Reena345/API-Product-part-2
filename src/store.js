import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Slices/AddToCart/AddToSlice'


export const store = configureStore({
    reducer:{
        counter:counterReducer
    }
})