import { createSlice } from "@reduxjs/toolkit";

const LocationSlice = createSlice({
    name : 'location',
    initialState : {
        locData : null ,
        initLocData : null ,
    },
    reducers : {
        setLocData : (state , action)=>{
            state.locData = action.payload
        },
        setInitLocData : (state,action)=>{
            state.initLocData = action.payload
        }
    }
})

export default LocationSlice.reducer;
export const {setLocData , setInitLocData} = LocationSlice.actions;