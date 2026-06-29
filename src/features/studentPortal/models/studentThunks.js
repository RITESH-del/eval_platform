import { createAsyncThunk } from '@reduxjs/toolkit';
import * as studentAPI from '../api/studentApi.js';

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

export const fetchStudentExams = createAsyncThunk(
  'student/fetchExams',
  async ({ page = 1 } = {}, { rejectWithValue }) => {
    try {
      return await studentAPI.getStudentDashboardResults(page);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Unable to load student exams'
      );
    }
  }
);

export const fetchStudentExamDetail = createAsyncThunk(
  'student/fetchExamDetail',
  async (examId, { rejectWithValue }) => {
    try {
      return await studentAPI.getStudentSubmissionDetails(examId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Unable to load exam submission details'
      );
    }
  }
);