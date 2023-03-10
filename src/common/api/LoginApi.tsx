import {LoginRequest} from "../dto/request/LoginRequest";
import axios from "axios";
import {BaseResponse} from "../dto/response/BaseResponse";
import {LoginResponse} from "../dto/response/LoginResponse";

const LOGIN_URL: string = "http://localhost:8080/api/account/login";

const LoginApi = {
    async login (request: LoginRequest): Promise<BaseResponse<LoginResponse> | any> {
        try {
            const response = await axios.post<BaseResponse<LoginResponse>>(
                LOGIN_URL,
                request,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
export default LoginApi;
