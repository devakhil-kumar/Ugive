import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendOtpSignup} from '../apis/service'; // Import your API function

// Create OTP Registration Thunk
export const sendOtpSignupThunk = createAsyncThunk(
  'auth/sendOtpSignup',
  async (payload, thunkAPI) => {
    try {
      const { email, name } = payload;
      if (!email || !name) {
        return thunkAPI.rejectWithValue('Email and name are required');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return thunkAPI.rejectWithValue('Please enter a valid email address');
      }
      const response = await sendOtpSignup(email, name);
      console.log('OTP sent successfully:', response);

      return {
        email,
        name,
        message: response.data?.message || 'OTP sent successfully',
        success: true,
      };
    } catch (error) {
      console.log('Error sending OTP:', error);
      const errorMessage = 
        error.response?.data?.message || 
        error.message || 
        'Failed to send OTP';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  user: {
    email: null,
    name: null,
  },
  otpSent: false,
  loading: false,
  error: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },

    resetAuth: (state) => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    // Handle sendOtpSignupThunk
    builder
      // When thunk is pending (API call in progress)
      .addCase(sendOtpSignupThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })

      // When thunk is fulfilled (API call successful)
      .addCase(sendOtpSignupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.user.email = action.payload.email;
        state.user.name = action.payload.name;
        state.successMessage = action.payload.message;
        state.error = null;
      })
   
      .addCase(sendOtpSignupThunk.rejected, (state, action) => {
        state.loading = false;
        state.otpSent = false;
        state.error = action.payload; // Error message from thunk
        state.successMessage = null;
      });
  },
});

export const { clearError, clearSuccessMessage, resetAuth } = authSlice.actions;
export default authSlice.reducer;
