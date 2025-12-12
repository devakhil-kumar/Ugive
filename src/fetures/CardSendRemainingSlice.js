import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CardSendRemaining } from '../apis/service'; 

export const fetchCardSendRemaining = createAsyncThunk(
  'card/fetchSendRemaining',
  async (_, { rejectWithValue }) => {
    try {
      const response = await CardSendRemaining();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  currentReward: null,
  nextRewards: [],
  loading: false,
  error: null,
  success: false
};

const cardRemainingSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    clearCardError: (state) => {
      state.error = null;
    },
    resetCardState: (state) => {
      state.currentReward = null;
      state.nextRewards = [];
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardSendRemaining.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardSendRemaining.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.currentReward = action.payload.currentReward;
        state.nextRewards = action.payload.nextRewards;
        state.error = null;
      })
      .addCase(fetchCardSendRemaining.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
});

export const { clearCardError, resetCardState } = cardRemainingSlice .actions;
export default cardRemainingSlice.reducer;