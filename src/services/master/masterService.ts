import axios from 'axios';
import BaseResponse from 'common/dto/response/BaseResponse';
import { IMasterResponse } from 'common/dto/response/MasterResponse';

const MASTER_URL: string = 'http://localhost:8080/api/master/';

const MasterService = {
    getByCategory: async function (category: string): Promise<BaseResponse<IMasterResponse> | any> {
        try {
            return await axios.get(MASTER_URL + 'getByCategory', {
                params: {
                    category: category,
                },
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    },
};
export default MasterService;
