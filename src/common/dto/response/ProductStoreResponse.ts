import {ProductImage} from "./ProductImage";

export interface ProductStoreResponse {
    id: number,
    version: number,
    name: string,
    productCode: string,
    price: number,
    type: string,
    brand: string,
    category: string,
    unitInStock: number,
    discount: number,
    image: ProductImage[] | null,
    productReviewList: null,
    new: boolean
}