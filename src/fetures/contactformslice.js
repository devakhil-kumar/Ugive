// ─── features/contactFormSlice.js ────────────────────────────────────────────
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ContactFromData } from '../apis/api';

// ─── Thunk ────────────────────────────────────────────────────────────────────

export const submitContactForm = createAsyncThunk(
  'contactForm/submit',
  async (formData, { rejectWithValue }) => {
    try {
      const result = await ContactFromData(formData);
      return result?.data;
    } catch (err) {
      return rejectWithValue(
        typeof err === 'string' ? err : 'Failed to submit contact form',
      );
    }
  },
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const contactFormSlice = createSlice({
  name: 'contactForm',

  initialState: {
    submitting: false,
    success: false,
    submittedData: null, // stores the response data after success
    error: null,
  },

  reducers: {
    resetContactForm(state) {
      state.submitting = false;
      state.success = false;
      state.submittedData = null;
      state.error = null;
    },
    clearContactFormError(state) {
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(submitContactForm.pending, state => {
        state.submitting = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.submitting = false;
        state.success = true;
        state.submittedData = action.payload;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.submitting = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetContactForm, clearContactFormError } =
  contactFormSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectContactSubmitting = state =>
  state.contactForm?.submitting ?? false;
export const selectContactSuccess = state =>
  state.contactForm?.success ?? false;
export const selectContactError = state => state.contactForm?.error ?? null;
export const selectContactSubmitted = state =>
  state.contactForm?.submittedData ?? null;

export default contactFormSlice.reducer;
