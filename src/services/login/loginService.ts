import fetchData, { IUseAxiosProps } from 'common/axios/customAxios';
import { LoginRequest } from 'common/dto/request/LoginRequest';
import { LoginResponse } from 'common/dto/response/LoginResponse';

const LoginService = {
	login(request: LoginRequest) {
		const props: IUseAxiosProps = {
			url: '/account/login',
			request: request,
			method: 'POST',
		}
		return fetchData<LoginResponse>(props);
	}
};
export default LoginService;
