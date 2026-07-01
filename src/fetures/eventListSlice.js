import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EventListStudent } from '../apis/service'; // adjust path as needed

// ─── Async Thunk ─────────────────────────────────────────────────────────────

export const fetchEventList = createAsyncThunk(
  'eventList/fetchEventList',
  async ({ page = 1, limit = 10, category } = {}, { rejectWithValue }) => {
    try {
      const response = await EventListStudent({ page, limit, category });
      console.log(
        'slice full response:',
        response,
        'page:',
        page,
        'category:',
        category,
      );
      return {
        events: response?.data ?? [],
        total: response?.total ?? 0,
        totalPages: response?.totalPages ?? 1,
        page,
      };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to fetch events',
      );
    }
  },
);

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState = {
  events: [],
  loading: false,
  loadingMore: false,
  error: null,
  page: 1,
  totalPages: 1,
  total: 0,
  hasMore: true,
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const eventListSlice = createSlice({
  name: 'eventList',
  initialState,
  reducers: {
    resetEvents: state => {
      state.events = [];
      state.page = 1;
      state.totalPages = 1;
      state.total = 0;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder

      // ── Pending ──────────────────────────────────────────────────────────
      .addCase(fetchEventList.pending, (state, action) => {
        const isFirst = (action.meta.arg?.page ?? 1) === 1;
        if (isFirst) {
          state.loading = true;
        } else {
          state.loadingMore = true;
        }
        state.error = null;
      })

      // ── Fulfilled ─────────────────────────────────────────────────────────
      .addCase(fetchEventList.fulfilled, (state, action) => {
        const { events: newEvents, total, totalPages, page } = action.payload;

        // Always guarantee an array
        const safeEvents = Array.isArray(newEvents) ? newEvents : [];

        console.log('fulfilled → newEvents:', safeEvents, 'page:', page);

        if (page === 1) {
          state.events = safeEvents;
        } else {
          // Append and deduplicate by _id
          const existingIds = new Set(state.events.map(e => e._id));
          const unique = safeEvents.filter(e => !existingIds.has(e._id));
          state.events = [...state.events, ...unique];
        }

        state.page = page;
        state.total = total;
        state.totalPages = totalPages;
        state.hasMore = page < totalPages;
        state.loading = false;
        state.loadingMore = false;
      })

      // ── Rejected ──────────────────────────────────────────────────────────
      .addCase(fetchEventList.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.loadingMore = false;
      });
  },
});

export const { resetEvents } = eventListSlice.actions;
export default eventListSlice.reducer;
