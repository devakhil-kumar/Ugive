import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EligibilityCard } from '../apis/service';

export const fetchEligibility = createAsyncThunk(
    'eligibility/fetchEligibility',
    async (_, { rejectWithValue }) => {
      try {
        const response = await EligibilityCard();
        if (response.success === false) {
          return rejectWithValue(response);
        }
        console.log(response, 'response+++++++')
        return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch eligibility status');
      }
    }
  );
  
const eligibilitySlice = createSlice({
    name: 'eligibility',
    initialState: {
        eligible: false,
        success: false,
        message: '',
        next_available_date: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearEligibility: (state) => {
            state.eligible = false;
            state.success = false;
            state.message = '';
            state.next_available_date = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEligibility.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEligibility.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success ?? false;
                state.eligible = action.payload.eligible ?? false;
                state.message = action.payload.message || '';
                state.next_available_date = action.payload.next_available_date || null;
            })
            .addCase(fetchEligibility.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
                state.eligible = false;
                state.success = false;
            });
    },
});

export const { clearEligibility } = eligibilitySlice.actions;

export default eligibilitySlice.reducer;