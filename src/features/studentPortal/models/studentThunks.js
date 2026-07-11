import { createAsyncThunk } from '@reduxjs/toolkit';
import * as studentAPI from '../api/studentApi.js';
 
/**
 * Fetches the student profile.
 * Dispatch: fetchStudentProfile()
 */
export const fetchStudentProfile = createAsyncThunk(
  'student/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await studentAPI.getStudentHeaderContext();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Unable to load student profile'
      );
    }
  }
);
 
/**
 * Fetches paginated student exams.
 * Dispatch: fetchStudentExams({ page: 2 })  ← must always pass an object
 *
 * NOTE: Always call with an object: dispatch(fetchStudentExams({ page: 2 }))
 * Passing a plain number will be caught and default to page 1 with a warning.
 */
export const fetchStudentExams = createAsyncThunk(
  'student/fetchExams',
  async (arg = {}, { rejectWithValue }) => {
    // Guard: if caller accidentally passes a plain number instead of { page }
    const resolvedArg = typeof arg === 'number'
      ? (console.warn('[fetchStudentExams] Expected { page } object but received a number. Defaulting to page', arg), { page: arg })
      : arg;
 
    const { page = 1 } = resolvedArg;
 
    try {
      return await studentAPI.getStudentDashboardResults(page);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Unable to load student exams'
      );
    }
  }
);
 
/**
 * Fetches a single exam's full detail and submission history.
 * Dispatch: fetchStudentExamDetail(examId)
 */
export const fetchStudentExamDetail = createAsyncThunk(
  'student/fetchExamDetail',
  async (examId, { rejectWithValue }) => {
    if (!examId && examId !== 0) {
      return rejectWithValue('A valid examId is required');
    }
    try {
      return await studentAPI.getStudentSubmissionDetails(examId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Unable to load exam submission details'
      );
    }
  }
);