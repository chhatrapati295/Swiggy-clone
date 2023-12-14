import { configureStore } from "@reduxjs/toolkit";
import LocationSlice from "./slices/LocationSlice";

const store = configureStore({
    reducer : {
        loc : LocationSlice
    }
})

export default store;