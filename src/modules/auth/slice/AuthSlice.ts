import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "@/shared/domain/enums/LoadingState";
import { LoginAsync } from "../use-case/login/LoginAsync";
import { UserEntity } from "../models/authEntity";

type AuthState = {
  user: UserEntity | null;
  loginLoading: LoadingState;
  error: string | null;
};

const initialAuthState: AuthState = {
  user: null,
  loginLoading: LoadingState.idle,
  error: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loginLoading = LoadingState.idle;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginAsync.pending, (state) => {
        state.loginLoading = LoadingState.pending;
        state.error = null;
      })
      .addCase(LoginAsync.fulfilled, (state, action) => {
        state.loginLoading = LoadingState.success;
        state.user = action.payload;
      })
      .addCase(LoginAsync.rejected, (state, action) => {
        state.loginLoading = LoadingState.failed;
        state.error = action.error.message || "Login failed";
      });
  },
});

export const { logout } = AuthSlice.actions;
