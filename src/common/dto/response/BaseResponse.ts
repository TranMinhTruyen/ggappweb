export default interface BaseResponse<T> {
	timestamp: string | '',
	message: string | '',
	payload: T | null
}
