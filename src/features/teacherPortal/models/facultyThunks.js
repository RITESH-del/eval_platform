import { createAsyncThunk } from '@reduxjs/toolkit';
import * as facultyAPI from '../api/teacherApi';

// createLab remaining, will do later

export const fetchFacultyProfile = createAsyncThunk(
    "faculty/profile",
    async (_, {rejectWithValue})=>{
        try {
            const response = await facultyAPI.fetchTeacherProfile();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch faculty profile');
        }
    }
)

export const fetchPastPracticals = createAsyncThunk(
    "faculty/pastPracticals",
    async (_, {rejectWithValue})=>{
        try {
            const response = await facultyAPI.fetchPastPracticals();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch past practicals');
        }
    }
)

export const fetchLabDetails = createAsyncThunk(
    "faculty/labDetails",
    async (examId, {rejectWithValue})=>{
        try {
            const response = await facultyAPI.fetchLabDetails(examId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch lab details');
        }
    }
)   

export const fetchLabSubmissions = createAsyncThunk(
    "faculty/labSubmissions",
    async (examId, {rejectWithValue})=>{
        try {
            const response = await facultyAPI.fetchLabSubmissions(examId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch lab submissions');
        }
    }
)   

export const fetchQuizConfig = createAsyncThunk(
    "faculty/quizConfig",
    async (_, {rejectWithValue})=>{
        try {
            const response = await facultyAPI.fetchQuizConfig();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch quiz config');
        }
    }
)   

export const fetchStudentSubmissionDetail = createAsyncThunk(
    "faculty/studentSubmissionDetail",
    async ({examId, sessionId}, {rejectWithValue})=>{
        try {
            const response = await facultyAPI.fetchStudentSubmissionDetail(examId, sessionId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch student submission detail');
        }
    }
)       

export const fetchLabSessions = createAsyncThunk(
    "faculty/labSessions",
    async (_, {rejectWithValue})=>{
        try {
            const response = await facultyAPI.fetchLabSessions();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch lab sessions');
        }
    }
)   

