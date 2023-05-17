import {CartResponse} from "../dto/response/CartResponse";
import BaseResponse from "../dto/response/BaseResponse";
import axios from "axios";

const CART_URL: string = "http://localhost:8080/api/cart/";

const CartApi = {
	async createCartAndAddProductToCart(productId: number, storeId: number, productAmount: number, accessToken: string): Promise<CartResponse | any> {
		try {
			return await axios.post<BaseResponse<CartResponse>>(
				CART_URL + "createCartAndAddProductToCart",
				null,
				{
					params: {
						productId: productId,
						storeId: storeId,
						productAmount: productAmount
					},
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + accessToken,
					},
				}
			);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return error.response?.data;
			}
		}
	}
}
export default CartApi;