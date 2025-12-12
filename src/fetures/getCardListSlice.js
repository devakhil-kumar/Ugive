// thunks/cardThunks.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {listCardSend} from '../apis/service';

export const listCards = createAsyncThunk(
  'cards/listCards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await listCardSend();
      console.log(response, 'response=====')
      return response; 
    } catch (error) {
      console.log(error, 'error in thunk');
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
    cards: [],
    loading: false,
    error: null,
  };
  
  const SendlistSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
      clearCardError: (state) => {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(listCards.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(listCards.fulfilled, (state, action) => {
          state.loading = false;
          state.cards = action.payload;
        })
        .addCase(listCards.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        });
    },
  });
  
  export const { clearCardError } = SendlistSlice.actions;
  export default SendlistSlice.reducer;
