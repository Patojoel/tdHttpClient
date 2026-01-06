import type { HttpClient } from "../../../../shared/gateway/HttpClient";
import type { ProductGateway } from "../../models/gateway/ProductGateway";
import type { GetAllProductsResponse } from "../../use-case/get-all-products/GetAllProductsResponse";
import { productsRoutes } from "./routes";

export class ProductHttpGateway implements ProductGateway {
  constructor(private httpProvider: HttpClient) {}

  async getAllProducts(): Promise<GetAllProductsResponse> {
    const result = await this.httpProvider
      .get(productsRoutes.getAllProducts)
      .then((res) => res.json());
    return result;
  }
}
