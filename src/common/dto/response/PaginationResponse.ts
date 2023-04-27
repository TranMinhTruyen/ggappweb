export interface PaginationResponse<T> {
    data: T[] | [],
    totalRecord: number | null,
    page: number | null,
    size: number | null,
    totalPage: number | null
}
