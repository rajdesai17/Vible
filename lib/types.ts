export interface PageInfo {
    hasNextPage: boolean;
    nextCursor?: string;
    total: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    pageInfo: PageInfo;
}

export interface PaginationParams {
    cursor?: string;
    limit?: number;
    tag?: string;
    aiTool?: string;
}