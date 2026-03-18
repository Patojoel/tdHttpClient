import type { AuthGateway } from "../modules/auth/models/gateway/AuthGateway";
import type { ProductGateway } from "../modules/products/models/gateway/ProductGateway";

export interface Dependencies {
  productsGateway: ProductGateway;
  authGateway: AuthGateway;
}
