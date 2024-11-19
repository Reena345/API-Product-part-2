import { createSlice } from '@reduxjs/toolkit'
import AddToCard from '../../Component/AddToCart/AddToCart';

   
const initialState ={
    value:0,
    products:[ {id:'1',name:'apple'}]
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers:{
        addToCard:(state)=>{
            state.value +=1
        }
    }
});
export const {addToCard } = counterSlice.actions
export default counterSlice.reducer