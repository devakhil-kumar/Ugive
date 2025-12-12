import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SendCardsFriends } from '../apis/api';

export const sendCardToFriend = createAsyncThunk(
  'cards/sendToFriend',
  async (cardData, { rejectWithValue }) => {
    try {
      const response = await SendCardsFriends(cardData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to send card'
      );
    }
  }
);

const initialState = {
    loading: false,
    success: false,
    error: null,
    sentCard: null,
  };
  
  const cardSendSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
      resetCardState: (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.sentCard = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(sendCardToFriend.pending, (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        })
        .addCase(sendCardToFriend.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.sentCard = action.payload;
          state.error = null;
        })
        .addCase(sendCardToFriend.rejected, (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { resetCardState } = cardSendSlice.actions;
  export default cardSendSlice.reducer;