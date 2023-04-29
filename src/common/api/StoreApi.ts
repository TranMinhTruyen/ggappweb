import axios from "axios";
import BaseResponse, {errorBaseResponse} from "../dto/response/BaseResponse";
import {PaginationResponse} from "../dto/response/PaginationResponse";
import {StoreResponse} from "../dto/response/StoreResponse";
import {ProductStoreResponse} from "../dto/response/ProductStoreResponse";

const STORE_URL: string = "http://localhost:8080/api/store/";

const StoreApi = {
    async getAllStore(page: number): Promise<BaseResponse<PaginationResponse<StoreResponse>> | any > {
        try {
            const response = await axios.get(
                STORE_URL + 'getAllStore',
                {
                    params: {
                        page: page,
                        size: 5
                    }
                }
            );
            return response.data;
        } catch (error) {
            return errorBaseResponse;
        }
    },
    async getProductFromStore(size: number, page: number, storeId: number): Promise<BaseResponse<PaginationResponse<ProductStoreResponse>> | any > {
        try {
            const response = await axios.get(
                STORE_URL + 'getProductFromStore',
                {
                    params: {
                        page: page,
                        size: size,
                        storeId: storeId
                    }
                }
            );
            return response.data;
        } catch (error) {
            return errorBaseResponse;
        }
    }
}

export default StoreApi;
