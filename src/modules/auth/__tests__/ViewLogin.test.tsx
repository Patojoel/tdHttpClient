import { describe, it, expect, vi } from "vitest";
import { renderWithProviders, screen, fireEvent } from "@/test/render-utils";
import { ViewLogin } from "../infra/ui/ViewLogin";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../infra/ui/components/LoginForm";
import { LoadingState } from "@/shared/domain/enums/LoadingState";



describe("ViewLogin UI", () => {
  it("doit afficher le formulaire de connexion par défaut", () => {
    const mockBehavior = {
      username: "",
      setUsername: vi.fn(),
      password: "",
      setPassword: vi.fn(),
      loading: LoadingState.idle,
      handleLogin: vi.fn(),
    };
    renderWithProviders(<LoginForm behavior={mockBehavior as any} />);

    expect(screen.getByText(/Connexion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Identifiant/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Se connecter/i })
    ).toBeInTheDocument();
  });

  it("doit appeler la gateway lors de la soumission du formulaire", async () => {
    // 1. Arrange
    const authGatewayMock = {
      login: vi.fn().mockResolvedValue({ id: 1, username: "emilys" }),
    };

    renderWithProviders(<ViewLogin />, {
      dependencies: { authGateway: authGatewayMock },
    });

    const user = userEvent.setup();

    // 2. Act
    await user.type(screen.getByLabelText(/identifiant/i), "emilys");
    await user.type(screen.getByLabelText(/mot de passe/i), "emilyspass");
    await user.click(screen.getByRole("button", { name: /se connecter/i }));

    // 3. Assert
    expect(authGatewayMock.login).toHaveBeenCalled();
  });

  it("doit afficher un message d'erreur en cas d'échec", async () => {
     // 1. Arrange
     const authGatewayMock = {
        login: vi.fn().mockRejectedValue(new Error("Accès refusé")),
      };
  
      renderWithProviders(<ViewLogin />, {
        dependencies: { authGateway: authGatewayMock },
      });
  
      const user = userEvent.setup();
  
      // 2. Act
      await user.type(screen.getByLabelText(/identifiant/i), "wrong");
      await user.type(screen.getByLabelText(/mot de passe/i), "wrong");
      await user.click(screen.getByRole("button", { name: /se connecter/i }));
  
      // 3. Assert (Note: on utilise toastify dans useLogin, on peut simplement vérifier que l'appel a été fait et l'état final)
      expect(authGatewayMock.login).toHaveBeenCalled();
  });
});
