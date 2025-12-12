import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchUsersByNameEmail } from '../apis/api';

export const searchUsers = createAsyncThunk(
  'search/searchUsers',
  async (searchTerm, { rejectWithValue }) => {
    try {
      if (!searchTerm || !searchTerm.trim()) {
        return rejectWithValue('Type something to search');
      }

      const response = await searchUsersByNameEmail(searchTerm.trim());
      return response.data; 

    } catch (error) {
      const message = 
        error.response?.data?.message || 
        error.message || 
        'Search failed';

      return rejectWithValue(message);
    }
  }
);

const searchFriendSlice = createSlice({
    name: 'search',
    initialState: {
      results: [],
      loading: false,
      error: null,
    },
    reducers: {
      clearSearchResults: (state) => {
        state.results = [];
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(searchUsers.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(searchUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.results = action.payload;
        })
        .addCase(searchUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.results = [];
        });
    },
  });
  
  export const { clearSearchResults } = searchFriendSlice.actions;
  export default searchFriendSlice.reducer;