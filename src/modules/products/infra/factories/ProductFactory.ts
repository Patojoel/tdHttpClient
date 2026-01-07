import { GetAllProductsResponse } from "../../use-case/get-all-products/GetAllProductsResponse";

export default class ProductFactory {
  static buildProductsResponseFromApi(data: any): GetAllProductsResponse {
    return {
      products: Array.from(data.products).map(
        ({ thumbnail, ...product }: any) => ({
          ...product,
          image: thumbnail,
        })
      ),
      limit: data.limit,
      skip: data.page,
      total: data.total,
    };
  }
}
