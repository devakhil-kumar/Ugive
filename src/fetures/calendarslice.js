import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getALLEventCalander } from '../apis/api';

/**
 * Fetch all events for a calendar month.
 * Dispatched with { month, year }.
 */
export const fetchCalendarEvents = createAsyncThunk(
  'calendar/fetchEvents',
  async ({ month, year }, { rejectWithValue }) => {
    try {
      // getALLEventCalander returns response.data → { success: true, data: [...] }
      const result = await getALLEventCalander(month, year);
      return { events: result?.data ?? [], month, year };
    } catch (err) {
      return rejectWithValue(
        typeof err === 'string' ? err : 'Failed to load calendar',
      );
    }
  },
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Groups an array of events into an object keyed by "YYYY-MM-DD".
 * Each key maps to an array of events on that date.
 *
 * @param {Array} events
 * @returns {{ [dateStr: string]: Array }}
 */
const groupByDate = events => {
  const map = {};
  events.forEach(evt => {
    if (!evt.startTime) return;
    const dateKey = evt.startTime.split('T')[0]; // "2026-06-20"
    if (!map[dateKey]) map[dateKey] = [];
    map[dateKey].push(evt);
  });
  return map;
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const calendarSlice = createSlice({
  name: 'calendar',

  initialState: {
    /** { "YYYY-MM-DD": [event, ...] } – populated per fetched month */
    eventsByDate: {},

    /** Which month/year is currently loaded */
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),

    loading: false,
    error: null,
  },

  reducers: {
    /** Call this when the user swipes to a new month so the screen can re-fetch. */
    setCalendarMonth(state, action) {
      state.month = action.payload.month;
      state.year = action.payload.year;
    },

    /** Clear calendar data (e.g. on logout). */
    resetCalendar(state) {
      state.eventsByDate = {};
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchCalendarEvents.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalendarEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.month = action.payload.month;
        state.year = action.payload.year;

        // Merge so previously fetched months are preserved in memory
        const grouped = groupByDate(action.payload.events);
        state.eventsByDate = { ...state.eventsByDate, ...grouped };
      })
      .addCase(fetchCalendarEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCalendarMonth, resetCalendar } = calendarSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────

/** Returns the full eventsByDate map */
export const selectEventsByDate = state => state.calendar?.eventsByDate ?? {};

/** Returns events for a specific "YYYY-MM-DD" string */
export const selectEventsForDate = dateStr => state =>
  state.calendar?.eventsByDate?.[dateStr] ?? [];

export default calendarSlice.reducer;
