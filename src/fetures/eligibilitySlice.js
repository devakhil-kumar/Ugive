import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EligibilityCard } from '../apis/service';
import { GetNote } from '../apis/api';

export const fetchEligibility = createAsyncThunk(
  'eligibility/fetchEligibility',
  async (_, { rejectWithValue }) => {
    try {
      const response = await EligibilityCard();
      if (response.success === false) {
        return rejectWithValue(response);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'Failed to fetch eligibility status');
    }
  }
);

export const sendNote = createAsyncThunk(
  'sendCards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetNote();
            console.log(response, 'response+++++++')
      return response.data;

    } catch (erorr) {
      console.log(erorr, 'error')
      return rejectWithValue(erorr?.response?.data || 'Failed to fetch eligibility status');
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
    noteData: null
  },
  reducers: {
    clearEligibility: (state) => {
      state.eligible = false;
      state.success = false;
      state.message = '';
      state.next_available_date = null;
      state.error = null;
      state.noteData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEligibility.pending, (state) => {
        state.loading = true;
        state.error = null;
        //  state.eligible = false;
      })
      .addCase(fetchEligibility.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success ?? false;
        state.eligible = action.payload.eligible;
        state.message = action.payload.message || '';
        state.next_available_date = action.payload.next_available_date || null;
        console.log(action.payload.eligible, 'eligible______')
      })
      .addCase(fetchEligibility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.eligible = false;
        state.success = false;
      })

      .addCase(sendNote.fulfilled, (state, action) => {
        state.noteData = action.payload;
        console.log('Note Data Fetched:', action.payload);
      })
      .addCase(sendNote.rejected, (state, action) => {
        console.log('Failed to fetch note:', action.payload);
      });
  },
});

export const { clearEligibility } = eligibilitySlice.actions;

export default eligibilitySlice.reducer;