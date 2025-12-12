import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getRewardsCollages} from '../apis/service';
import { fetchClaimRewards } from './claimRewardsSlice';

export const fetchRewardsCollages = createAsyncThunk(
  'rewards/fetchCollages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRewardsCollages();
      console.log(response, 'response+++++++++++')
      return response.data; 
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch rewards'
      );
    }
  }
);

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState: {
    list: [],             
    loading: false,
    error: null,
    success: false,
    message: '',
    stats: null,
  },
  reducers: {
    clearRewardsState: (state) => {
      state.error = null;
      state.success = false;
      state.message = '';
      state.stats = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRewardsCollages.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchRewardsCollages.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.list = action.payload.data || []; 
        state.stats = action.payload.stats
      })
      .addCase(fetchRewardsCollages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.success = false;
      })
      .addCase(fetchClaimRewards.fulfilled, (state, action) => {
        const rewardId = action.meta.arg;

        state.list = state.list.map((item) =>
          item.rewardId === rewardId
            ? { ...item, claimed: true }   // 👈 set claimed true
            : item
        )
      })
  },
});

export const { clearRewardsState } = rewardsSlice.actions;
export default rewardsSlice.reducer;