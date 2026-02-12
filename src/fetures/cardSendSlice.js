import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SendCardsFriends, checkBanWordsApi } from '../apis/api';

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

export const checkBanWords = createAsyncThunk(
  'card/checkforbanWords',
  async (message, { rejectWithValue }) => {
    try {
      console.log("Data from slice :" , message)
      const response = await checkBanWordsApi(message);
      return response.data;
    } catch (error) {
      console.log("Error from slice :" ,error)
      return rejectWithValue(error.response?.data || "Message Validation Failed")
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  error: null,
  sentCard: null,
  banWordError: null
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
      state.banWordError = null;
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
      })
      .addCase(checkBanWords.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.banWordError = null;
      })
      .addCase(checkBanWords.fulfilled, (state, action) => {
        state.loading = false;
        state.banWordCheck = action.payload;
      })
      .addCase(checkBanWords.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.banWordError = action.payload;
      });
  },
});

export const { resetCardState } = cardSendSlice.actions;
export default cardSendSlice.reducer;