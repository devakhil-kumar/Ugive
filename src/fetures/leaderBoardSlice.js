import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaderboard } from '../apis/api';

export const fetchLeaderboard = createAsyncThunk(
  'leaderboard/fetch',
  async (
    { page = 1, limit = 50, period = 'all' } = {},
    { rejectWithValue },
  ) => {
    try {
      const data = await getLeaderboard({ page, limit, period });
      console.log(data, 'data in leaderboard slice');
      return { ...data, page, period }; // Reducer me handling easy karne ke liye return data
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to load leaderboard',
      );
    }
  },
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    data: [],
    myResult: null,
    college: null,
    university: null,
    total: 0,
    totalEntries: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 50,
    loading: false,
    loadingMore: false,
    error: null,
    // Naye variables UI dates aur period tracking ke liye
    startDate: null,
    endDate: null,
    currentPeriod: 'all',
  },
  reducers: {
    resetLeaderboard: state => {
      state.data = [];
      state.currentPage = 1;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLeaderboard.pending, (state, action) => {
        const page = action.meta.arg?.page ?? 1;
        const period = action.meta.arg?.period ?? 'all';

        if (page === 1) {
          state.loading = true;
          // Agar user ne tab change kiya hai (period badla hai), toh old data clear kar do
          if (state.currentPeriod !== period) {
            state.data = [];
          }
        } else {
          state.loadingMore = true;
        }
        state.error = null;
      })

      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        const {
          data,
          myResult,
          college,
          university,
          total,
          totalEntries,
          totalPages,
          page,
          period,
          startDate, // Backend se aane wali start date
          endDate, // Backend se aane wali end date
        } = action.payload;

        if (page === 1) {
          state.data = data;
        } else {
          const existingIds = new Set(state.data.map(s => s.studentId));
          const fresh = data.filter(s => !existingIds.has(s.studentId));
          state.data = [...state.data, ...fresh];
        }

        state.myResult = myResult ?? state.myResult;
        state.college = college ?? state.college;
        state.university = university ?? state.university;
        state.total = total ?? state.total;
        state.totalEntries = totalEntries ?? state.totalEntries;
        state.totalPages = totalPages ?? state.totalPages;
        state.currentPage = page;

        // Tab aur dates ko update karo
        state.currentPeriod = period;
        state.startDate = startDate ?? null;
        state.endDate = endDate ?? null;

        state.loading = false;
        state.loadingMore = false;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.payload;
      });
  },
});

export const { resetLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
