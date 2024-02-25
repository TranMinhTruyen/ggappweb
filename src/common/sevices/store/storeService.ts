import { PaginationResponse } from '../../dto/response/PaginationResponse';
import { ProductStoreResponse } from '../../dto/response/ProductStoreResponse';
import fetchData, { IUseAxiosProps } from '../../axios/customAxios';
import { StoreResponse } from '../../dto/response/StoreResponse';

const StoreService = {
	async getAllStore(page: number) {
		const props: IUseAxiosProps = {
			url: '/store/getAllStore',
			param: {
				page: page,
				size: 5,
			},
			method: 'GET',
		};
		return await fetchData<PaginationResponse<StoreResponse>>(props);
	},
	getProductFromStore(size: number, page: number, storeId: number) {
		const props: IUseAxiosProps = {
			url: '/store/getProductFromStore',
			param: {
				page: page,
				size: size,
				storeId: storeId
			},
			method: 'GET',
		};
		return fetchData<PaginationResponse<ProductStoreResponse>>(props);
	},
};

export default StoreService;
