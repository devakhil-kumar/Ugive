import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFriendRecevied, ConfirmFriendRequest, DeleteFriendRequest } from '../apis/service';

// Fetch received friend requests
export const fetchReceivedFriendRequests = createAsyncThunk(
  'friendsReceived/fetchReceivedFriendRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFriendRecevied();
      console.log('Friend Requests Response:', response);
      return response?.data?.results || [];
    } catch (error) {
      console.error('Error fetching received friend requests:', error);
      const message =
        error.response?.data?.message ||
        error.message ||  
        'Network error. Please try again.';
      return rejectWithValue(message);
    }
  }
);

// Accept friend request
export const acceptFriendRequestAction = createAsyncThunk(  
  'friendsReceived/acceptFriendRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      console.log('Accepting friend request with ID:', requestId);
      const response = await ConfirmFriendRequest(requestId);
      console.log('Accept Friend Response:', response);
      
      if (response?.data?.error) {
        return rejectWithValue(response?.data?.message || 'Failed to accept friend request');
      }
      
      // Return requestId so we can remove it from the list
      return { requestId};
    } catch (error) {
      console.error('Error accepting friend request:', error);
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to accept friend request';
      return rejectWithValue(message);
    }
  }
);

// Reject/Delete friend request
export const rejectFriendRequestAction = createAsyncThunk(
  'friendsReceived/rejectFriendRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      console.log('Rejecting friend request with ID:', requestId);
      const response = await DeleteFriendRequest(requestId);
      console.log('Reject Friend Response:', response);
      
      if (response?.data?.error) {
        return rejectWithValue(response?.data?.message || 'Failed to reject friend request');
      }
      
      // Return requestId so we can remove it from the list
      return { requestId};
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to reject friend request';
      return rejectWithValue(message);
    }
  }
);

const friendsReceivedSlice = createSlice({
  name: 'friendsReceived',
  initialState: {
    receivedRequests: [],
    loading: false,
    error: null,
    actionLoading: {}, 
  },
  reducers: {
    clearReceivedError: (state) => {
      state.error = null;
    },
    clearReceivedRequests: (state) => {
      state.receivedRequests = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch received requests
      .addCase(fetchReceivedFriendRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReceivedFriendRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.receivedRequests = action.payload;
        console.log('Received requests updated:', action.payload);
      })
      .addCase(fetchReceivedFriendRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load requests';
      })
      
      // Accept friend request
      .addCase(acceptFriendRequestAction.pending, (state, action) => {
        const requestId = action.meta.arg;
        console.log('Accept pending for:', requestId);
        state.actionLoading[requestId] = 'accepting';
      })
      .addCase(acceptFriendRequestAction.fulfilled, (state, action) => {
        const { requestId } = action.payload;
        console.log('Accept fulfilled for:', requestId);
        state.receivedRequests = state.receivedRequests.filter(
          request => request._id !== requestId
        );
        delete state.actionLoading[requestId];
      })
      .addCase(acceptFriendRequestAction.rejected, (state, action) => {
        const requestId = action.meta.arg;
        console.log('Accept rejected for:', requestId);
        delete state.actionLoading[requestId];
        state.error = action.payload || 'Failed to accept request';
      })
      
      // Reject friend request
      .addCase(rejectFriendRequestAction.pending, (state, action) => {
        const requestId = action.meta.arg;
        console.log('Reject pending for:', requestId);
        state.actionLoading[requestId] = 'rejecting';
      })
      .addCase(rejectFriendRequestAction.fulfilled, (state, action) => {
        const { requestId } = action.payload;
        console.log('Reject fulfilled for:', requestId);
        state.receivedRequests = state.receivedRequests.filter(
          request => request._id !== requestId
        );
        delete state.actionLoading[requestId];
      })
      .addCase(rejectFriendRequestAction.rejected, (state, action) => {
        const requestId = action.meta.arg;
        console.log('Reject rejected for:', requestId);
        delete state.actionLoading[requestId];
        state.error = action.payload || 'Failed to reject request';
      });
  },
});

export const { clearReceivedError, clearReceivedRequests } = friendsReceivedSlice.actions;
export default friendsReceivedSlice.reducer;