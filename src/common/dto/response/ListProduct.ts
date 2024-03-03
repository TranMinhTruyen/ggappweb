import { ProductImage } from './ProductImage';

export interface ListProduct {
    productId: number;
    storeId: number;
    productName: string;
    price: number;
    productImage: ProductImage[];
    priceAfterDiscount: number;
    productAmount: number;
}
