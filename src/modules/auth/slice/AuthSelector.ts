import { RootState } from "@/config/create-store";
import { createSelector } from "@reduxjs/toolkit";

const getAuthState = (state: RootState) => state.authReducer;

const getUser = createSelector(getAuthState, (state) => state.user);

const getLoginLoading = createSelector(
  getAuthState,
  (state) => state.loginLoading
);

const getError = createSelector(getAuthState, (state) => state.error);

export const AuthSelector = {
  getUser,
  getLoginLoading,
  getError,
};
