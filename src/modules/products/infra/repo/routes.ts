import { GetAllProductsCommand } from "../../use-case/get-all-products/GetALLProductCommand";



export const productsRoutes = {
    getAllProducts:(command:GetAllProductsCommand)=> `/products${command.search ? `/search?q=${command.search}&` : `?`}limit=${command.limit}&skip=${(command.page - 1)*command.limit}`,
}