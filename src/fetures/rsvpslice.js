// ─── features/rsvpSlice.js ────────────────────────────────────────────────────
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRsvpStatus } from '../apis/api';

// ─── Thunk ────────────────────────────────────────────────────────────────────

export const submitRsvp = createAsyncThunk(
  'rsvp/submit',
  async ({ eventId, status }, { rejectWithValue }) => {
    try {
      const result = await postRsvpStatus(eventId, status);
      return { eventId, status, data: result?.data };
    } catch (err) {
      return rejectWithValue(
        typeof err === 'string' ? err : 'Failed to update RSVP',
      );
    }
  },
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const rsvpSlice = createSlice({
  name: 'rsvp',

  initialState: {
    /**
     * Tracks per-event RSVP status in memory.
     * Shape: { [eventId]: 'going' | 'not_going' | 'maybe' | null }
     */
    statusMap: {},

    /** eventId currently being submitted (shows loader on that card) */
    submittingId: null,

    error: null,
  },

  reducers: {
    /** Seed initial statuses from the event list API (myRsvpStatus field) */
    seedRsvpStatuses(state, action) {
      // payload: [{ id, myRsvpStatus }, ...]
      action.payload.forEach(evt => {
        if (evt.id && !state.statusMap[evt.id]) {
          state.statusMap[evt.id] = evt.myRsvpStatus ?? null;
        }
      });
    },

    clearRsvpError(state) {
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(submitRsvp.pending, (state, action) => {
        state.submittingId = action.meta.arg.eventId;
        state.error = null;
      })
      .addCase(submitRsvp.fulfilled, (state, action) => {
        const { eventId, status } = action.payload;
        state.statusMap[eventId] = status;
        state.submittingId = null;
      })
      .addCase(submitRsvp.rejected, (state, action) => {
        state.submittingId = null;
        state.error = action.payload;
      });
  },
});

export const { seedRsvpStatuses, clearRsvpError } = rsvpSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────

/** Returns the current RSVP status for a specific event */
export const selectRsvpStatus = eventId => state =>
  state.rsvp?.statusMap?.[eventId] ?? null;

/** True while a specific event's RSVP is being submitted */
export const selectRsvpSubmitting = eventId => state =>
  state.rsvp?.submittingId === eventId;

export default rsvpSlice.reducer;
