import { LoginRequest } from '../../dto/request/LoginRequest';
import { LoginResponse } from '../../dto/response/LoginResponse';
import fetchData, { IUseAxiosProps } from '../../axios/customAxios';

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
