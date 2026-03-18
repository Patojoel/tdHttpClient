import { describe, it, expect, vi } from "vitest";
import { createTestStore } from "@/config/create-store";
import { LoginAsync } from "../use-case/login/LoginAsync";
import { LoadingState } from "@/shared/domain/enums/LoadingState";

describe("LoginAsync Integration", () => {
  const userMock = {
    id: 1,
    username: "emilys",
    email: "emily@test.com",
    firstName: "Emily",
    lastName: "Johnson",
    gender: "female",
    image: "test.png",
    accessToken: "jwt",
    refreshToken: "refresh",
  };

  it("doit appeler la gateway et mettre à jour le store en cas de succès", async () => {
    // 1. Arrange (Préparation avec un mock de la Gateway)
    const authGatewayMock = {
      login: vi.fn().mockResolvedValue(userMock),
    };
    const store = createTestStore({ authGateway: authGatewayMock });

    const command = { username: "emilys", password: "password" };

    // 2. Act (L'action utilisateur)
    await store.dispatch(LoginAsync(command));

    // 3. Assert (Vérification)
    expect(authGatewayMock.login).toHaveBeenCalledWith(command);
    expect(store.getState().authReducer.user).toEqual(userMock);
    expect(store.getState().authReducer.loginLoading).toBe(LoadingState.success);
  });

  it("doit gérer l'échec de la gateway", async () => {
    // 1. Arrange
    const authGatewayMock = {
      login: vi.fn().mockRejectedValue(new Error("Erreur de connexion")),
    };
    const store = createTestStore({ authGateway: authGatewayMock });

    // 2. Act
    await store.dispatch(LoginAsync({ username: "bad", password: "bad" }));

    // 3. Assert
    expect(store.getState().authReducer.loginLoading).toBe(LoadingState.failed);
    expect(store.getState().authReducer.error).toBe("Erreur de connexion");
  });
});
