import { createEntityAdapter } from "@reduxjs/toolkit"


export interface ProductEntity {
    id:string
    title:string
    price:number
    description:string
    category:string
    image:string
    
}

export const ProductEntityAdapter=createEntityAdapter<ProductEntity>()