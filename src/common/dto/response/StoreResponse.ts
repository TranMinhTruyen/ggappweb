export interface StoreResponse {
    id: number;
    storeCode?: string;
    storeAddress?: string;
    province?: any;
    manageId?: number;
    productStoreResponseList?: any;
    productStoreIssueResponses?: any;
    createdDate?: string;
    createdBy?: string;
    updateDate?: string;
    updateBy?: string;
    deleteDate?: string;
    deleteBy?: string;
    active?: boolean;
    deleted?: boolean;
}
