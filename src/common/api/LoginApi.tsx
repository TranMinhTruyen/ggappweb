import {LoginRequest} from "../dto/request/LoginRequest";
import axios from "axios";
import BaseResponse, {errorBaseResponse} from "../dto/response/BaseResponse";
import {LoginResponse} from "../dto/response/LoginResponse";

const LOGIN_URL: string = "http://localhost:8080/api/account/";

const LoginApi = {
    async login (request: LoginRequest): Promise<BaseResponse<LoginResponse> | any> {
        try {
            const response = await axios.post<BaseResponse<LoginResponse>>(
                LOGIN_URL + "login",
                request,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            return response.data;
        } catch (error) {
            return errorBaseResponse;
        }
    }
}
export default LoginApi;
