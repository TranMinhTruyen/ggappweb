import axios, { AxiosRequestConfig } from 'axios';
import BaseResponse from '../dto/response/BaseResponse';

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface IUseAxiosProps {
	url: string;
	request?: any;
	param?: any;
	method: ApiMethod;
}

const fetchData = async <PayloadType>(props: IUseAxiosProps): Promise<BaseResponse<PayloadType>> => {
	const { url, method, param, request } = props;
	const config: AxiosRequestConfig = {
		baseURL: 'http://localhost:8080/api',
		url: url,
		method: method,
		data: request,
		params: param,
		timeout: 30000,
	};
	try {
		const response = await axios(config);
		return {
			status: response.status,
			timestamp: response.data.timestamp,
			message: response.data.message,
			payload: response.data.payload,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const errorResponse: BaseResponse<any> = {
				status: error.status,
				timestamp: error.response?.data.timestamp,
				message: error.response?.data.message,
				payload: error.response?.data.payload,
			};
			if (error.code === 'ERR_NETWORK') {
				return {
					...errorResponse,
					status: 500,
					message: error.message,
				};
			} else {
				return errorResponse;
			}
		}
		throw error;
	}
};

export default fetchData;