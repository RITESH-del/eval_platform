// features/auth/model/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./authThunks";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    loading: false,
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
      .addCase(loginUser.fulfilled, (state, action) => {state.loading = false; state.user = action.payload;})
      .addCase(loginUser.rejected, (state, action) => {state.loading = false; state.error = action.error.message;})

      //signup
      .addCase(signupUser.pending, (state) => {state.loading = true})
      .addCase(signupUser.fulfilled, (state) => {state.loading = false; state.user = action.payload;})
      .addCase(signupUser.rejected, (state, action) => {state.loading = false; state.error = action.error.message;})


  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;