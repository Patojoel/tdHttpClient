import { AuthHttpGateway } from "../modules/auth/infra/repo/AuthHttpGateway";
import { ProductHttpGateway } from "../modules/products/infra/repo/ProductHttpGateway";
import fecthHttpClient from "../shared/infra/http/FetchHttpClient";
import type { Dependencies } from "./dependencies";

export const extraArgument: Dependencies = {
  productsGateway: new ProductHttpGateway(fecthHttpClient),
  authGateway: new AuthHttpGateway(fecthHttpClient),
};
