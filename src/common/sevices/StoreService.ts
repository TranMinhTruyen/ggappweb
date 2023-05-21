import axios from 'axios';
import BaseResponse from '../dto/response/BaseResponse';
import { PaginationResponse } from '../dto/response/PaginationResponse';
import { StoreResponse } from '../dto/response/StoreResponse';
import { ProductStoreResponse } from '../dto/response/ProductStoreResponse';

const STORE_URL: string = 'http://localhost:8080/api/store/';

const StoreService = {
	getAllStore: async function (page: number): Promise<BaseResponse<PaginationResponse<StoreResponse>> | any> {
		try {
			return await axios.get(
				STORE_URL + 'getAllStore',
				{
					params: {
						page: page,
						size: 5,
					}
				}
			);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return error.response?.data;
			}
		}
	},
	async getProductFromStore(size: number, page: number, storeId: number): Promise<BaseResponse<PaginationResponse<ProductStoreResponse>> | any> {
		try {
			return await axios.get(
				STORE_URL + 'getProductFromStore',
				{
					params: {
						page: page,
						size: size,
						storeId: storeId
					}
				}
			);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return error.response?.data;
			}
		}
	}
};

export default StoreService;
