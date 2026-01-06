import { ProductHttpGateway } from "../modules/products/infra/repo/ProductHttpGateway";
import httpClient from "../shared/infra/http/FetchHttpClient";
import type { Dependencies } from "./dependencies";

export const extraArgument: Dependencies = {
  productsGateway: new ProductHttpGateway(httpClient),
};
