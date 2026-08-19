// import { createSlice } from "@reduxjs/toolkit";
// import {
//   fetchProfile,
//   fetchFacultiesThunk,
//   fetchStudentsThunk,
//   deleteFacultyThunk,
//   updateFacultyThunk,
//   importStudentsThunk
// } from "../thunks/adminThunks.js";

// const adminSlice = createSlice({
//   name: "admin",

//   initialState: {
//     profile: null,
//     stats: [],
//     faculties: [],
//     students: [],
//     loading: false,
//     loadingFaculties: false,
//     loadingStudents: false,
//     error: null,
//   },

//   reducers: {},

//   extraReducers(builder) {
//     // -------------------------
//     // Fetch Admin Profile
//     // -------------------------
//     builder
//       .addCase(fetchProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(fetchProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.profile = action.payload;
//       })

//       .addCase(fetchProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // -------------------------
//     // Fetch Faculties
//     // -------------------------
//     builder
//       .addCase(fetchFacultiesThunk.pending, (state) => {
//         state.loadingFaculties = true;
//         state.error = null;
//       })

//       .addCase(fetchFacultiesThunk.fulfilled, (state, action) => {
//         state.loadingFaculties = false;
//         state.faculties = action.payload;
//       })

//       .addCase(fetchFacultiesThunk.rejected, (state, action) => {
//         state.loadingFaculties = false;
//         state.error = action.payload;
//       })

//       .addCase(
//   fetchStudentsThunk.pending,
//   (state) => {
//     state.loadingStudents = true;
//     state.error = null;
//   }
// )

// .addCase(
//   fetchStudentsThunk.fulfilled,
//   (state, action) => {
//     state.loadingStudents = false;
//     state.students = action.payload;
//   }
// )

// .addCase(
//   fetchStudentsThunk.rejected,
//   (state, action) => {
//     state.loadingStudents = false;
//     state.error = action.payload;
//   }
// )

// builder
//       .addCase(importStudentsThunk.pending, (state) => {
//         state.importingStudents = true;
//         state.error = null;
//       })

//       .addCase(
//         importStudentsThunk.fulfilled,
//         (state, action) => {
//           state.importingStudents = false;

//           /*
//            * If backend returns the newly created
//            * students directly:
//            *
//            * state.students.push(...action.payload);
//            *
//            * But if the backend returns an import
//            * summary, don't modify students here.
//            */
//         }
//       )

//       .addCase(
//         importStudentsThunk.rejected,
//         (state, action) => {
//           state.importingStudents = false;
//           state.error = action.payload;
//         }
//       );

//   },
// });

// export default adminSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

import {
  // Profile
  fetchProfile,

  // Faculty
  fetchFacultiesThunk,
  createFacultyThunk,
  updateFacultyThunk,
  deleteFacultyThunk,
  importFacultiesThunk,

  // Student
  fetchStudentsThunk,
  createStudentThunk,
  updateStudentThunk,
  deleteStudentThunk,
  importStudentsThunk,
} from "../thunks/adminThunks.js";

const initialState = {
  // --------------------------------
  // Admin
  // --------------------------------
  profile: null,
  stats: [],

  // --------------------------------
  // Users
  // --------------------------------
  faculties: [],
  students: [],

  // --------------------------------
  // Loading states
  // --------------------------------
  loading: false,

  loadingFaculties: false,
  loadingStudents: false,

  creatingFaculty: false,
  updatingFaculty: false,
  deletingFaculty: false,
  importingFaculties: false,

  creatingStudent: false,
  updatingStudent: false,
  deletingStudent: false,
  importingStudents: false,

  // --------------------------------
  // Error
  // --------------------------------
  error: null,
};

const adminSlice = createSlice({
  name: "admin",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // =====================================================
    // ADMIN PROFILE
    // =====================================================

    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })

      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message;
      });

    // =====================================================
    // FETCH FACULTIES
    // =====================================================

    builder
      .addCase(
        fetchFacultiesThunk.pending,
        (state) => {
          state.loadingFaculties = true;
          state.error = null;
        }
      )

      .addCase(
        fetchFacultiesThunk.fulfilled,
        (state, action) => {
          state.loadingFaculties = false;
          state.faculties = action.payload;
        }
      )

      .addCase(
        fetchFacultiesThunk.rejected,
        (state, action) => {
          state.loadingFaculties = false;
          state.error =
            action.payload || action.error.message;
        }
      );

    // =====================================================
    // CREATE FACULTY
    // =====================================================

    builder
      .addCase(
        createFacultyThunk.pending,
        (state) => {
          state.creatingFaculty = true;
          state.error = null;
        }
      )

      .addCase(
        createFacultyThunk.fulfilled,
        (state, action) => {
          state.creatingFaculty = false;

          /*
           * Assuming the backend returns
           * the newly created faculty object.
           *
           * Example:
           * {
           *   id: "...",
           *   name: "John Smith",
           *   ...
           * }
           */
          if (action.payload) {
            state.faculties.push(action.payload);
          }
        }
      )

      .addCase(
        createFacultyThunk.rejected,
        (state, action) => {
          state.creatingFaculty = false;
          state.error =
            action.payload || action.error.message;
        }
      );

    // =====================================================
    // UPDATE FACULTY
    // =====================================================

    builder
      .addCase(
        updateFacultyThunk.pending,
        (state) => {
          state.updatingFaculty = true;
          state.error = null;
        }
      )

      .addCase(
        updateFacultyThunk.fulfilled,
        (state, action) => {
          state.updatingFaculty = false;

          /*
           * action.meta.arg:
           *
           * {
           *   id,
           *   data
           * }
           */

          const updatedFaculty =
            action.payload;

          if (!updatedFaculty) return;

          const index =
            state.faculties.findIndex(
              (faculty) =>
                faculty.id === updatedFaculty.id
            );

          if (index !== -1) {
            state.faculties[index] =
              updatedFaculty;
          }
        }
      )

      .addCase(
        updateFacultyThunk.rejected,
        (state, action) => {
          state.updatingFaculty = false;
          state.error =
            action.payload || action.error.message;
        }
      );

    // =====================================================
    // DELETE FACULTY
    // =====================================================

    builder
      .addCase(
        deleteFacultyThunk.pending,
        (state) => {
          state.deletingFaculty = true;
          state.error = null;
        }
      )

      .addCase(
        deleteFacultyThunk.fulfilled,
        (state, action) => {
          state.deletingFaculty = false;

          /*
           * The faculty ID was passed as the thunk argument.
           */
          const deletedId =
            action.meta.arg;

          state.faculties =
            state.faculties.filter(
              (faculty) =>
                faculty.id !== deletedId
            );
        }
      )

      .addCase(
        deleteFacultyThunk.rejected,
        (state, action) => {
          state.deletingFaculty = false;
          state.error =
            action.payload || action.error.message;
        }
      );

    // =====================================================
    // IMPORT FACULTIES
    // =====================================================

    builder
      .addCase(
        importFacultiesThunk.pending,
        (state) => {
          state.importingFaculties = true;
          state.error = null;
        }
      )

      .addCase(
        importFacultiesThunk.fulfilled,
        (state) => {
          state.importingFaculties = false;

          /*
           * Do not modify faculties here.
           *
           * The backend may return an import summary
           * rather than the complete faculty list.
           *
           * After successful import, fetch faculties
           * again from the server.
           */
        }
      )

      .addCase(
        importFacultiesThunk.rejected,
        (state, action) => {
          state.importingFaculties = false;
          state.error =
            action.payload || action.error.message;
        }
      );

    // =====================================================
    // FETCH STUDENTS
    // =====================================================

    builder
      .addCase(
        fetchStudentsThunk.pending,
        (state) => {
          state.loadingStudents = true;
          state.error = null;
        }
      )

      .addCase(
        fetchStudentsThunk.fulfilled,
        (state, action) => {
          state.loadingStudents = false;
          state.students = action.payload;
        }
      )

      .addCase(
        fetchStudentsThunk.rejected,
        (state, action) => {
          state.loadingStudents = false;
          state.error =
            action.payload || action.error.message;
        }
      );

    // =====================================================
    // CREATE STUDENT
    // =====================================================

    builder
      .addCase(
        createStudentThunk.pending,
        (state) => {
          state.creatingStudent = true;
          state.error = null;
        }
      )

      .addCase(
        createStudentThunk.fulfilled,
        (state, action) => {
          state.creatingStudent = false;

          /*
           * Assuming the backend returns the
           * created student object.
           */
          if (action.payload) {
            state.students.push(
              action.payload
            );
          }
        }
      )

      .addCase(
        createStudentThunk.rejected,
        (state, action) => {
          state.creatingStudent = false;
          state.error =
            action.payload || action.error.message;
        }
      );

    // =====================================================
    // UPDATE STUDENT
    // =====================================================

    builder
      .addCase(
        updateStudentThunk.pending,
        (state) => {
          state.updatingStudent = true;
          state.error = null;
        }
      )

      .addCase(
        updateStudentThunk.fulfilled,
        (state, action) => {
          state.updatingStudent = false;

          const updatedStudent =
            action.payload;

          if (!updatedStudent) return;

          const index =
            state.students.findIndex(
              (student) =>
                student.id === updatedStudent.id
            );

          if (index !== -1) {
            state.students[index] =
              updatedStudent;
          }
        }
      )

      .addCase(
        updateStudentThunk.rejected,
        (state, action) => {
          state.updatingStudent = false;
          state.error =
            action.payload || action.error.message;
        }
      );

    // =====================================================
    // DELETE STUDENT
    // =====================================================

    builder
      .addCase(
        deleteStudentThunk.pending,
        (state) => {
          state.deletingStudent = true;
          state.error = null;
        }
      )

      .addCase(
        deleteStudentThunk.fulfilled,
        (state, action) => {
          state.deletingStudent = false;

          const deletedId =
            action.meta.arg;

          state.students =
            state.students.filter(
              (student) =>
                student.id !== deletedId
            );
        }
      )

      .addCase(
        deleteStudentThunk.rejected,
        (state, action) => {
          state.deletingStudent = false;
          state.error =
            action.payload || action.error.message;
        }
      );

    // =====================================================
    // IMPORT STUDENTS
    // =====================================================

    builder
      .addCase(
        importStudentsThunk.pending,
        (state) => {
          state.importingStudents = true;
          state.error = null;
        }
      )

      .addCase(
        importStudentsThunk.fulfilled,
        (state) => {
          state.importingStudents = false;

          /*
           * The server should ideally return an
           * import summary.
           *
           * Refetch students after successful import.
           */
        }
      )

      .addCase(
        importStudentsThunk.rejected,
        (state, action) => {
          state.importingStudents = false;
          state.error =
            action.payload || action.error.message;
        }
      );
  },
});

export default adminSlice.reducer;