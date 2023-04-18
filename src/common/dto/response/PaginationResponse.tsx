export interface PaginationResponse<T> {
    data: [T],
    totalRecord: number,
    page: number,
    size: number,
    totalPage: number
}
