import type { ProductEntity } from "../../models/productEntity";


export interface GetAllProductsResponse {
    products:ProductEntity[];
    total:number;
    skip:number;
    limit:number;


}