import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StudentGetData } from '../apis/api';

export const fetchStudentProfile = createAsyncThunk(
  'student/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await StudentGetData();
      console.log(response.data, 'response in student slice');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to fetch student profile',
      );
    }
  },
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder

      // Pending
      .addCase(fetchStudentProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })

      // Fulfilled
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })

      // Rejected
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
