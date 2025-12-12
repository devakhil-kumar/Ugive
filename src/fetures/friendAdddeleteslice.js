import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddFriendSent } from '../apis/service';

export const addFriend = createAsyncThunk(
  'friends/addFriend',
  async (receiverId, { rejectWithValue }) => {
    try {
      if (!receiverId) {
        return rejectWithValue('User ID is required');
      }
      const response = await AddFriendSent(receiverId);
      return {
        success: true,
        message: response.data?.message || 'Friend request sent!',
        data: response.data?.data,       
        receiverId: receiverId           
      };

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to send request';

      return rejectWithValue(message);
    }
  }
);

const friendAddDeleteSlice = createSlice({
    name: 'friends',
    initialState: {
      loadingById: {},     // { "user123": true/false }
      sentRequestIds: [],  // ["user123", "user456"]
      error: null,
    },
  
    reducers: {
      clearFriendError: (state) => {
        state.error = null;
      },
    },
  
    extraReducers: (builder) => {
      builder
        .addCase(addFriend.pending, (state, action) => {
          const receiverId = action.meta.arg;  
          state.loadingById[receiverId] = true;
          state.error = null;
        })
  
        .addCase(addFriend.fulfilled, (state, action) => {
          const receiverId = action.payload.receiverId;
          state.loadingById[receiverId] = false;
          state.sentRequestIds.push(receiverId); 
        })
  
        .addCase(addFriend.rejected, (state, action) => {
          const receiverId = action.meta.arg;
          state.loadingById[receiverId] = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { clearFriendError } = friendAddDeleteSlice.actions;
  export default friendAddDeleteSlice.reducer