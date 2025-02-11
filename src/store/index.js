import { configureStore } from "@reduxjs/toolkit";
import marvelReducer from "./slice/marvelSlice";

const store = configureStore({
    reducer: {
        marvel: marvelReducer,
    },
});

export default store