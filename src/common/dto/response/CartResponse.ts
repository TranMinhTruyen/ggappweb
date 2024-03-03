import { ListProduct } from './ListProduct';

export interface CartResponse {
    userId: string;
    version: number;
    productList: ListProduct[];
    productTotalAmount: number;
    amountInCart: number;
    totalPrice: number;
    createdDate: string;
    createdBy: string;
    updateDate: string;
    updateBy: string;
    deleteDate: string;
    deleteBy: string;
}
