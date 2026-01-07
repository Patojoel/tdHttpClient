import { GetAllProductsCommand } from "../../use-case/get-all-products/GetALLProductCommand";



export const productsRoutes = {
    getAllProducts:(command:GetAllProductsCommand)=> `/products?limit=${command.limit}&skip=${command.page*command.limit}`,
}