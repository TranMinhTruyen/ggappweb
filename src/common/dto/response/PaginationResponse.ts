export interface PaginationResponse<T> {
	data: T[] | [],
	totalRecord: number | 0,
	page: number | 0,
	size: number | 0,
	totalPage: number | 0
}
