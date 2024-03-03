export default interface BaseResponse<T = any> {
    status?: number;
    timestamp: string | '';
    message: string | '';
    payload: T;
}
