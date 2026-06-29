import { createSlice } from '@reduxjs/toolkit';
import {
  fetchStudentExamDetail,
  fetchStudentExams,
  fetchStudentProfile,
} from './studentThunks.js';

const initialPagination = { page: 1, limit: 15, total: 0, hasMore: false };

const initialState = {
  profile: null,
  exams: [],
  pagination: initialPagination,
  selectedExam: null,
  loading: false,
  loadingExams: false,
  loadingExamDetail: false,
  error: null,
};

// ---------------------------------------------------------------------------
// Payload extractors — each matches the exact shape the backend returns
// ---------------------------------------------------------------------------

/**
 * Backend always returns the profile as a flat object directly.
 * { id, university_id, name, email, section, graduation_year, role }
 */
const extractProfile = (payload) => payload ?? null;

/**
 * Backend always returns { exams: [...], pagination: { ... } }.
 * Keeping a single Array.isArray fallback for safety during API transitions.
 */
const extractExams = (payload) => {
  if (!payload || typeof payload !== 'object') {
    console.warn('[extractExams] Unexpected payload shape:', payload);
    return [];
  }
  if (Array.isArray(payload.exams)) return payload.exams;
  // Fallback: if backend ever returns a bare array
  if (Array.isArray(payload)) return payload;
  console.warn('[extractExams] Could not find exams array in payload:', payload);
  return [];
};

/**
 * Backend always returns a pagination object.
 * Warns loudly instead of silently falling back so shape regressions are visible.
 */
const extractPagination = (payload) => {
  if (!payload?.pagination) {
    console.warn('[extractPagination] Missing pagination in response — using defaults. Payload:', payload);
    return initialPagination;
  }
  return payload.pagination;
};

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    clearSelectedExam(state) {
      state.selectedExam = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── fetchStudentProfile ──────────────────────────────────────────────
      .addCase(fetchStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = extractProfile(action.payload);
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── fetchStudentExams ────────────────────────────────────────────────
      .addCase(fetchStudentExams.pending, (state) => {
        state.loadingExams = true;
        state.error = null;
      })
      .addCase(fetchStudentExams.fulfilled, (state, action) => {
        state.loadingExams = false;
        state.exams = extractExams(action.payload);
        state.pagination = extractPagination(action.payload);
      })
      .addCase(fetchStudentExams.rejected, (state, action) => {
        state.loadingExams = false;
        state.error = action.payload;
      })

      // ── fetchStudentExamDetail ───────────────────────────────────────────
      .addCase(fetchStudentExamDetail.pending, (state) => {
        state.loadingExamDetail = true;
        state.error = null;
      })
      .addCase(fetchStudentExamDetail.fulfilled, (state, action) => {
        state.loadingExamDetail = false;
        // Backend returns a single structured object — store it directly.
        // Access in components as: selectedExam.exam_details.title, etc.
        state.selectedExam = action.payload ?? null;
      })
      .addCase(fetchStudentExamDetail.rejected, (state, action) => {
        state.loadingExamDetail = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedExam, clearError } = studentSlice.actions;
export default studentSlice.reducer;