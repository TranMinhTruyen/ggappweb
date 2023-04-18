import BaseResponse, {errorBaseResponse} from "../dto/response/BaseResponse";
import {PaginationResponse} from "../dto/response/PaginationResponse";
import {StoreResponse} from "../dto/response/StoreResponse";
import axios from "axios";

const STORE_URL: string = "http://localhost:8080/api/store/";

const StoreApi = {
    async fetchAllStore (page: number): Promise<BaseResponse<PaginationResponse<StoreResponse>> | any> {
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
    }
}

export default StoreApi;
