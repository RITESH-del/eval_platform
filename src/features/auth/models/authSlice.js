// features/auth/model/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, fetchCurrentUser } from "./authThunks";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    loading: false,
    initialized: false,
    error: null,
  },

  reducers: {
    logout(state) {
      state.user = null;
    },
  },

  extraReducers(builder) {
    builder
      // login
      .addCase(loginUser.pending, (state) => {state.loading = true;})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false; 
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem( "token", action.payload.token );
      })
      .addCase(loginUser.rejected, (state, action) => {state.loading = false; state.error = action.error.message;})

      //signup
      .addCase(signupUser.pending, (state) => {state.loading = true})
      .addCase(signupUser.fulfilled, (state) => {state.loading = false; state.user = action.payload;})
      .addCase(signupUser.rejected, (state, action) => {state.loading = false; state.error = action.error.message;})

       .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
    })

        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })

        .addCase(fetchCurrentUser.rejected, (state) => {
            state.loading = false;
            state.user = null;
        });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;