import type { HttpClient } from "../../../../shared/gateway/HttpClient";
import type { ProductGateway } from "../../models/gateway/ProductGateway";
import { GetAllProductsCommand } from "../../use-case/get-all-products/GetALLProductCommand";
import type { GetAllProductsResponse } from "../../use-case/get-all-products/GetAllProductsResponse";
import ProductFactory from "../factories/ProductFactory";
import { productsRoutes } from "./routes";

export class ProductHttpGateway implements ProductGateway {
  constructor(private httpProvider: HttpClient) {}

  async getAllProducts(
    command: GetAllProductsCommand
  ): Promise<GetAllProductsResponse> {
    const result = await this.httpProvider
      .get(productsRoutes.getAllProducts(command))
      .then((res) => res.json());
    return ProductFactory.buildProductsResponseFromApi(result);
  }
}
