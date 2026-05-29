import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EventDetailsStatus } from '../apis/api';

export const fetchEventDetail = createAsyncThunk(
  'eventDetail/fetch',
  async (eventId, { rejectWithValue }) => {
    try {
      const result = await EventDetailsStatus(eventId);
      return result?.data;
    } catch (err) {
      return rejectWithValue(
        typeof err === 'string' ? err : 'Failed to load event details',
      );
    }
  },
);

const eventDetailSlice = createSlice({
  name: 'eventDetail',

  initialState: {
    event: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearEventDetail(state) {
      state.event = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchEventDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(fetchEventDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEventDetail } = eventDetailSlice.actions;

export const selectEventDetail = state => state.eventDetail?.event ?? null;
export const selectEventDetailLoading = state =>
  state.eventDetail?.loading ?? false;
export const selectEventDetailError = state => state.eventDetail?.error ?? null;

export default eventDetailSlice.reducer;
