export interface Column {
    key: string
    label: string
}

export interface Pagination {
    currentPage: number
    lastPage: number
    total: number
}