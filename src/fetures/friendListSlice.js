import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFriendList } from '../apis/service';

export const fetchFriendList = createAsyncThunk(
  'friends/fetchFriendList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFriendList();
      return response?.data?.results || [];
    } catch (error) {
      console.error('Error fetching friend list:', error);
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch friend list';
      return rejectWithValue(message); 
    }
  }
);

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    list: [],
    total: 0,
    page: 1,
    limit: 20,
    loading: false,
    error: null,
  },
  reducers: {
    clearFriendsError: (state) => {
      state.error = null;
    },
    clearFriendsList: (state) => {
      state.list = [];
      state.total = 0;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendList.pending, (state) => {
        console.log('Fetching friends - PENDING');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFriendList.fulfilled, (state, action) => {
        console.log('Fetching friends - FULFILLED');
        console.log('Payload received:', action.payload);
        state.loading = false;
        state.list = action.payload;
        state.total = action.payload.length;
        console.log('State.list after update:', state.list);
      })
      .addCase(fetchFriendList.rejected, (state, action) => {
        console.log('Fetching friends - REJECTED');
        console.log('Error:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearFriendsError, clearFriendsList } = friendsSlice.actions;
export default friendsSlice.reducer;