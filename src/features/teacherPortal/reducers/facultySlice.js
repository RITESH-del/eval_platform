import { createSlice } from "@reduxjs/toolkit";
import { fetchFacultyProfile, fetchPastPracticals, fetchLabDetails, fetchLabSubmissions, fetchStudentSubmissionDetail, fetchQuizConfig, fetchLabSessions, deleteQuizThunk, updateManualScore
    , publishResultThunk
 } from "../thunks/facultyThunks";

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
        },
        updateManualScoreLocal: (state, action) => {
            const { submissionId, manual_score } = action.payload;

            for (const response of state.studentSubmissionDetail.responses) {
                const submission = response.submission_history.find(
                (s) => s.id === submissionId
                );

                if (submission) {
                submission.manual_score = manual_score;
                break;
                }
            }
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

                  // DELETE
            .addCase(deleteQuizThunk.pending, (state) => {
              state.error = null;
            })

            .addCase(deleteQuizThunk.fulfilled, (state, action) => {

              state.pastPracticals = state.pastPracticals.filter(
                    practical => practical.id !== action.payload
                );
            })

            .addCase(deleteQuizThunk.rejected, (state, action) => {
              state.error = action.payload;
            })

            .addCase(updateManualScore.pending, (state) => {
              state.error = null;
            })

            .addCase(updateManualScore.fulfilled, (state, action) => {
              state.loading = false;
              state.error = null;
            })

            .addCase(updateManualScore.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })



            .addCase(publishResultThunk.fulfilled, (state, action) => {
                const updatedExam = action.payload;

                const exam = state.pastPracticals.find(
                    p => p.id === updatedExam.id
                );

                if (exam) {
                    exam.result_published = updatedExam.result_published;
                }
            })
    }   
})

export const {setSelectedExam, setSelectedSubmission, updateManualScoreLocal} = facultySlice.actions;
export default facultySlice.reducer;