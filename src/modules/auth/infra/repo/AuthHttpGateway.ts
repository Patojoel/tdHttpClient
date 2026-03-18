import { HttpClient } from "../../../../shared/gateway/HttpClient";
import AuthFactory from "../factories/AuthFactory";
import { AuthGateway } from "../../models/gateway/AuthGateway";
import { LoginCommand } from "../../use-case/login/LoginCommand";
import { LoginResponse } from "../../use-case/login/LoginResponse";
import { authRoutes } from "./routes";

export class AuthHttpGateway implements AuthGateway {
  constructor(private httpProvider: HttpClient) {}

  async login(command: LoginCommand): Promise<LoginResponse> {
    const result = await this.httpProvider
      .post(authRoutes.login(), command)
      .then((res) => res.json());

    return AuthFactory.buildUserResponseFromApi(result);
  }
}
