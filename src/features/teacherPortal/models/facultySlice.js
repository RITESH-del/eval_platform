import { createSlice } from "@reduxjs/toolkit";
import { fetchFacultyProfile, fetchPastPracticals, fetchLabDetails, fetchLabSubmissions, fetchStudentSubmissionDetail, fetchQuizConfig, fetchLabSessions } from "./facultyThunks";

export const facultySlice = createSlice({
    name: "faculty",
    initialState: {
        profile: null,
        pastPracticals: [],
        labDetails: null,
        labSubmissions: [],
        labSessions: [],
        quizConfig: null,
        studentSubmissionDetail: null,
        selectedExam: null,
        selectedSubmission: null,
        loading: false,
        error: null,
    },
    reducers: {
        setSelectedExam: (state, action) => {
            state.selectedExam = action.payload;
        },
        setSelectedSubmission: (state, action) => {
            state.selectedSubmission = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchFacultyProfile.pending, (state)=>{
                state.loading = true;
            })
            .addCase(fetchFacultyProfile.fulfilled, (state, action)=>{
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchFacultyProfile.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })



            .addCase(fetchPastPracticals.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPastPracticals.fulfilled, (state, action) => {
                state.loading = false;
                state.pastPracticals = action.payload;
            })
            .addCase(fetchPastPracticals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            .addCase(fetchLabDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLabDetails.fulfilled, (state, action)=>{
                state.loading = false;
                state.labDetails = action.payload;
            })
            .addCase(fetchLabDetails.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })



            .addCase(fetchLabSubmissions.pending, (state)=>{
                state.loading = true;
            })
            .addCase(fetchLabSubmissions.fulfilled, (state, action)=>{
                state.loading = false;
                state.labSubmissions = action.payload;
            })
            .addCase(fetchLabSubmissions.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })



            .addCase(fetchQuizConfig.pending, (state)=>{
                state.loading = true;
            })
            .addCase(fetchQuizConfig.fulfilled, (state, action)=>{
                state.loading = false;
                state.quizConfig = action.payload;
            })
            .addCase(fetchQuizConfig.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })



            .addCase(fetchStudentSubmissionDetail.pending, (state)=>{
                state.loading = true;
            })
            .addCase(fetchStudentSubmissionDetail.fulfilled, (state, action)=>{
                state.loading = false;
                state.studentSubmissionDetail = action.payload;
            })
            .addCase(fetchStudentSubmissionDetail.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })  


            .addCase(fetchLabSessions.pending, (state)=>{
                state.loading = true;
            })
            .addCase(fetchLabSessions.fulfilled, (state, action)=>{
                state.loading = false;
                state.labSessions = action.payload;
            })
            .addCase(fetchLabSessions.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })  
    }   
})

export const {setSelectedExam, setSelectedSubmission} = facultySlice.actions;
export default facultySlice.reducer;