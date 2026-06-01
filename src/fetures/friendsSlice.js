import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFriendsList } from '../apis/api'; // apna path adjust karo

// ─── Async Thunk ─────────────────────────────────────────────────────────────

export const fetchFriends = createAsyncThunk(
  'friends/fetchFriends',
  async (searchQuery, { rejectWithValue }) => {
    try {
      const data = await getFriendsList(searchQuery);
      return data; // { success, total, page, limit, results: [...] }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to fetch friends list',
      );
    }
  },
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    results: [], // array of friend objects from API
    loading: false,
    error: null,
  },
  reducers: {
    // Call this when user clears input or selects a friend — to hide dropdown
    clearFriends(state) {
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFriends.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload?.results || [];
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.results = [];
      });
  },
});

export const { clearFriends } = friendsSlice.actions;
export default friendsSlice.reducer;
