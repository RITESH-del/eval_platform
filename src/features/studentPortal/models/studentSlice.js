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

const extractProfile = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  return payload.profile || payload.data || payload.student || payload;
};

const extractExams = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if (Array.isArray(payload.exams)) return payload.exams;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload)) return payload;

  return [];
};

const extractPagination = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return initialPagination;
  }

  return payload.pagination || payload.meta || initialPagination;
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    clearSelectedExam(state) {
      state.selectedExam = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(fetchStudentExamDetail.pending, (state) => {
        state.loadingExamDetail = true;
        state.error = null;
      })
      .addCase(fetchStudentExamDetail.fulfilled, (state, action) => {
        state.loadingExamDetail = false;
        state.selectedExam = action.payload;
      })
      .addCase(fetchStudentExamDetail.rejected, (state, action) => {
        state.loadingExamDetail = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedExam } = studentSlice.actions;
export default studentSlice.reducer;