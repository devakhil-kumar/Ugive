import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DeleteAcountService } from "../apis/service";  
import { stat } from "react-native-fs";


export const deleteAccount = createAsyncThunk(
    'auth/deleteAccount',
    async (_, { rejectWithValue }) => {
        try {
            const response = await DeleteAcountService();
            console.log(response, 'response++++++++')
            return response; // API success data
        } catch (error) {
            console.log(error, 'errorr++++++++')
            return rejectWithValue(error);
        }
    }
);


const deleteSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        error: null,
        deleteSuccess: false,
        loginSuccess: false,
        message: null,
    },
    reducers: {
        resetAccountDeleted: (state) => { 
            state.accountDeleted = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteSuccess = true;
                state.accountDeleted = true;
                state.message= action.payload.message;
                state.user = null;       
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetAccountDeleted } = deleteSlice.actions;
export default deleteSlice.reducer;
