import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUniversitiesSerivce, getCollegesSerivce } from '../apis/service';

export const fetchUniversities = createAsyncThunk(
  'auth/fetchUniversities',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUniversitiesSerivce();
     return Array.isArray(data?.data) ? data?.data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchColleges = createAsyncThunk(
  'auth/fetchColleges',
  async (universityId, { rejectWithValue }) => {
    try {
      const data = await getCollegesSerivce(universityId);
      console.log(data.data, 'response+++++++++')
     return Array.isArray(data?.data) ? data?.data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  universities: [],
  colleges: [],
  universitiesLoading: false,
  collegesLoading: false,
  universitiesError: null,
  collegesError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearColleges: (state) => {
      state.colleges = [];
      state.collegesError = null;
    },
    resetAuthState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUniversities.pending, (state) => {
        state.universitiesLoading = true;
        state.universitiesError = null;
      })
      .addCase(fetchUniversities.fulfilled, (state, action) => {
        state.universitiesLoading = false;
      state.universities = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchUniversities.rejected, (state, action) => {
        state.universitiesLoading = false;
        state.universitiesError = action.payload;
           state.universities = []
      });

    builder
      .addCase(fetchColleges.pending, (state) => {
        state.collegesLoading = true;
        state.collegesError = null;
      })
      .addCase(fetchColleges.fulfilled, (state, action) => {
        state.collegesLoading = false;
      state.colleges = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchColleges.rejected, (state, action) => {
        state.collegesLoading = false;
        state.collegesError = action.payload;
        state.colleges = []
      });
  },
});

export const { clearColleges, resetAuthState } = authSlice.actions;
export default authSlice.reducer;