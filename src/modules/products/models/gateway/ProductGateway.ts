import { GetAllProductsCommand } from "../../use-case/get-all-products/GetALLProductCommand";
import type { GetAllProductsResponse } from "../../use-case/get-all-products/GetAllProductsResponse";



export interface ProductGateway {

    getAllProducts(command:GetAllProductsCommand): Promise<GetAllProductsResponse>;
}