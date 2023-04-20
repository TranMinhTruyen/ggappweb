export interface PaginationResponse<T> {
    data: [T] | null,
    totalRecord: number | null,
    page: number | null,
    size: number | null,
    totalPage: number | null
}
