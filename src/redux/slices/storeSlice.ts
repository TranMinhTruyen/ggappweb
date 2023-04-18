import {StoreResponse} from "../../common/dto/response/StoreResponse";
import {PaginationResponse} from "../../common/dto/response/PaginationResponse";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

const initialStore: StoreResponse = {
    id: 0,
    storeCode: "",
    storeAddress: "",
    province: null,
    manageId: 0,
    productStoreResponseList: null,
    productStoreIssueResponses: null,
    createdDate: "",
    createdBy: "",
    updateDate: "",
    updateBy: "",
    deleteDate: "",
    deleteBy: "",
    active: true,
    deleted: false
}

const initialState: PaginationResponse<StoreResponse> = {
    data: [initialStore],
    totalRecord: 0,
    page: 0,
    size: 0,
    totalPage: 0
}

export const storeSlice = createSlice({
    name: 'storeState',
    initialState,
    reducers: {
        hydrate: (state, action: PayloadAction<PaginationResponse<StoreResponse>>) => {
            return action.payload
        },
        setStore: (state, action: PayloadAction<PaginationResponse<StoreResponse>>) => {
            state.data = action.payload.data;
            state.totalRecord = action.payload.totalRecord;
            state.page = action.payload.page;
            state.size = action.payload.size;
            state.totalPage = action.payload.totalPage;
        }
    }
});

export const {
    hydrate,
    setStore
} = storeSlice.actions;

export const selectStore = ( state: RootState ) => state.storeState;

export default storeSlice.reducer;
