import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CalimRewards } from "../apis/service"; 

export const fetchClaimRewards = createAsyncThunk(
  "rewards/fetchClaimRewards",
  async (rewardId, { rejectWithValue }) => {
    try {
      const response = await CalimRewards(rewardId);
      console.log(response, 'response++++=')
      return response.data;
    } catch (error) {
      console.log(error, 'errorrvbdskgvbdsf')
      return rejectWithValue(error?.response?.data || "Something went wrong");
    }
  }
);

const claimRewardsSlice = createSlice({
    name: "claimRewards",
    initialState: {
      data: null,
      loading: false,
      error: null,
      success: false,
    },
    reducers: {
      clearClaimState: (state) => {
        state.data = null; 
        state.loading = false;
        state.success = false;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchClaimRewards.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        })
        .addCase(fetchClaimRewards.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.success = true;
        })
        .addCase(fetchClaimRewards.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Failed to claim reward";
          state.success = false;
        });
    },
  });
  
  export const { clearClaimState } = claimRewardsSlice.actions;
  
  export default claimRewardsSlice.reducer;
  