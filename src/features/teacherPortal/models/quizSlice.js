import { createSlice } from "@reduxjs/toolkit";

import {
  createQuizThunk,
  fetchQuizThunk,
  updateQuizThunk,
  deleteQuizThunk
} from "./facultyThunks";


/* Helper functions */
function calculateEndTime(startTime, duration) {
  if (!startTime || !duration) return "";

  const date = new Date(startTime);
  date.setMinutes(date.getMinutes() + Number(duration));

  return date.toISOString().slice(0, 16);
}



const initialState = {
  currentQuiz: {
    id: null,
    title: "",
    // subject: "",
    duration_minutes: 60,
    start_password: "",
    total_marks: 100,
    start_time: "",
    end_time: "",

    target_graduation_year: '',
    target_sections: [],

    questions: []
  },

  loading: false,
  saving: false,
  error: null
};

const quizSlice = createSlice({
  name: "quiz",

  initialState,

  reducers: {
    resetQuiz(state) {
      state.currentQuiz = initialState.currentQuiz;
    },

    setQuiz(state, action) {
      state.currentQuiz = action.payload;
    },

    updateQuizField(state, action) {
      const { field, value } = action.payload;

      state.currentQuiz[field] = value;

       if (field === "start_time" || field === "duration_minutes") {
        state.currentQuiz.end_time = calculateEndTime(state.currentQuiz.start_time, state.currentQuiz.duration_minutes);
       }
    },

    addQuestion(state) {
      state.currentQuiz.questions.push({
        id: crypto.randomUUID(),
        title: "",
        difficulty: "",
        statement: "",
        marks: 5,
        diagram: null,
        testCases: []
      });
    },

    removeQuestion(state, action) {
      state.currentQuiz.questions =
        state.currentQuiz.questions.filter(
          question =>
            question.id !== action.payload
        );
    },

    updateQuestion(state, action) {
      const {
        questionId,
        field,
        value
      } = action.payload;

      const question =
        state.currentQuiz.questions.find(
          q => q.id === questionId
        );

      if (question) {
        question[field] = value;
      }
    },

    addTestCase(state, action) {
      const { questionId } = action.payload;

      const question =
        state.currentQuiz.questions.find(
          q => q.id === questionId
        );

      if (!question) return;

      question.testCases.push({
        id: crypto.randomUUID(),
        input: "",
        output: ""
      });
    },

    removeTestCase(state, action) {
      const {
        questionId,
        testCaseId
      } = action.payload;

      const question =
        state.currentQuiz.questions.find(
          q => q.id === questionId
        );

      if (!question) return;

      question.testCases =
        question.testCases.filter(
          tc => tc.id !== testCaseId
        );
    },

    updateTestCase(state, action) {
      const {
        questionId,
        testCaseId,
        field,
        value
      } = action.payload;

      const question =
        state.currentQuiz.questions.find(
          q => q.id === questionId
        );

      if (!question) return;

      const testCase =
        question.testCases.find(
          tc => tc.id === testCaseId
        );

      if (!testCase) return;

      testCase[field] = value;
    }
  },

  extraReducers: builder => {
    builder

      // FETCH

      .addCase(
        fetchQuizThunk.pending,
        state => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchQuizThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.currentQuiz =
            action.payload;
        }
      )

      .addCase(
        fetchQuizThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      )

      // CREATE

      .addCase(
        createQuizThunk.pending,
        state => {
          state.saving = true;
          state.error = null;
        }
      )

      .addCase(
        createQuizThunk.fulfilled,
        (state, action) => {
          state.saving = false;
          //  console.log("PAYLOAD:", action.payload);
          state.currentQuiz.id = action.payload.id;
        }
      )

      .addCase(
        createQuizThunk.rejected,
        (state, action) => {
          state.saving = false;
          state.error = action.payload;
        }
      )

      // UPDATE

      .addCase(
        updateQuizThunk.pending,
        state => {
          state.saving = true;
          state.error = null;
        }
      )

      .addCase(
        updateQuizThunk.fulfilled,
        state => {
          state.saving = false;
        }
      )

      .addCase(
        updateQuizThunk.rejected,
        (state, action) => {
          state.saving = false;
          state.error =
            action.payload;
        }
      )
  }
});

export const {
  resetQuiz,
  setQuiz,
  updateQuizField,

  addQuestion,
  removeQuestion,
  updateQuestion,

  addTestCase,
  removeTestCase,
  updateTestCase
} = quizSlice.actions;

export default quizSlice.reducer;