import {CartResponse} from "../dto/response/CartResponse";
import BaseResponse, {errorBaseResponse} from "../dto/response/BaseResponse";
import axios from "axios";
import {useAppSelector} from "../../redux/hooks";
import {selectToken} from "../../redux/slices/tokenSlice";

const CART_URL: string = "http://localhost:8080/api/cart/";

const CartApi = {
    async createCartAndAddProductToCart (productId: number, storeId: number, productAmount: number, accessToken: string): Promise<CartResponse | any> {
        try {
            const response = await axios.post<BaseResponse<CartResponse>>(
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
            return response.data;
        } catch (error) {
            return errorBaseResponse;
        }
    }
}
export default CartApi;