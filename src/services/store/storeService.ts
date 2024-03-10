import fetchData, { IUseAxiosProps } from 'common/axios/customAxios';
import { PaginationResponse } from 'common/dto/response/PaginationResponse';
import { ProductStoreResponse } from 'common/dto/response/ProductStoreResponse';
import { StoreResponse } from 'common/dto/response/StoreResponse';

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
                storeId: storeId,
            },
            method: 'GET',
        };
        return fetchData<PaginationResponse<ProductStoreResponse>>(props);
    },
};

export default StoreService;
