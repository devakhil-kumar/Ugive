import { configureStore } from "@reduxjs/toolkit";
import getUniversityReducer from '../fetures/getUniversitySlice';
import messageReducer from '../fetures/messageSlice';
import authSliceReducer from '../fetures/authSlice';

const store = configureStore({
    reducer: {
        universities: getUniversityReducer,
        message: messageReducer,
        auth: authSliceReducer,
    }
})

export default store;