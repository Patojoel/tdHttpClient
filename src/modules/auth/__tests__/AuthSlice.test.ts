import { describe, it, expect } from "vitest";
import { AuthSlice, logout } from "../slice/AuthSlice";
import { LoadingState } from "@/shared/domain/enums/LoadingState";
import { LoginAsync } from "../use-case/login/LoginAsync";

describe("AuthSlice", () => {
  const initialState = {
    user: null,
    loginLoading: LoadingState.idle,
    error: null,
  };

  it("doit avoir l'état initial correct", () => {
    expect(AuthSlice.reducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("doit gérer logout", () => {
    const stateWithUser = {
      ...initialState,
      user: { id: 1, username: "test" } as any,
    };
    expect(AuthSlice.reducer(stateWithUser, logout())).toEqual(initialState);
  });

  describe("LoginAsync extraReducers", () => {
    it("doit passer en pending lors de LoginAsync.pending", () => {
      const state = AuthSlice.reducer(initialState, LoginAsync.pending("", {} as any));
      expect(state.loginLoading).toBe(LoadingState.pending);
      expect(state.error).toBe(null);
    });

    it("doit passer en success et stocker l'utilisateur lors de LoginAsync.fulfilled", () => {
      const user = { id: 1, username: "test" } as any;
      const state = AuthSlice.reducer(
        initialState,
        LoginAsync.fulfilled(user, "", {} as any)
      );
      expect(state.loginLoading).toBe(LoadingState.success);
      expect(state.user).toEqual(user);
    });

    it("doit passer en failed et stocker l'erreur lors de LoginAsync.rejected", () => {
      const errorMsg = "Identifiants invalides";
      const state = AuthSlice.reducer(
        initialState,
        LoginAsync.rejected(new Error(errorMsg), "", {} as any)
      );
      expect(state.loginLoading).toBe(LoadingState.failed);
      expect(state.error).toBe(errorMsg);
    });
  });
});
