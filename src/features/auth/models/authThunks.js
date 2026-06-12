// features/auth/model/authThunks.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup } from "../api/authApi";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials) => {
    const response = await login(credentials);
    return response.data;
  }
);


export const signupUser = createAsyncThunk(
  "auth/signup",
  async (credentials) => {
    const response = await signup(credentials);
    return response.data;
  }
)

export const googleLoginUser = createAsyncThunk(
  "auth/googleLogin",
  async (credential) => {
    const response = await googleLogin(
      credential
    );

    return response.data;
  }
);

export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await authAPI.fetchCurrentUser();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.message
            );
        }
    }
);