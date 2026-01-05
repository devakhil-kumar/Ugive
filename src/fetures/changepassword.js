// passwordSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { passwordChange } from '../apis/service';

export const changePassword = createAsyncThunk(
    'password/changePassword',
    async (passwordData, { rejectWithValue }) => {
        try {
            const response = await passwordChange(passwordData);
            console.log(response, 'password change response++++');
            return response.data;
        } catch (error) {
             return rejectWithValue(error.message);
        }
    }
);

const passwordSlice = createSlice({
    name: "password",
    initialState: {
        loading: false,
        success: false,
        error: null,
        dataresponse: null
    },
    reducers: {
        resetPasswordState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.dataresponse = action.payload;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetPasswordState } = passwordSlice.actions;
export default passwordSlice.reducer;