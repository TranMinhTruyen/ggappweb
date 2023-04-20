import {StoreResponse} from "../../common/dto/response/StoreResponse";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

const initialState: StoreResponse = {
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

export const storeSlice = createSlice({
    name: 'storeState',
    initialState,
    reducers: {
        hydrate: (state, action: PayloadAction<StoreResponse>) => {
            return action.payload
        },
        setStore: (state, action: PayloadAction<StoreResponse>) => {
            state.id = action.payload.id;
            state.storeCode = action.payload.storeCode;
            state.storeAddress = action.payload.storeAddress;
            state.province = action.payload.province;
            state.manageId = action.payload.manageId;
            state.productStoreResponseList = action.payload.productStoreResponseList;
            state.productStoreIssueResponses = action.payload.productStoreIssueResponses;
            state.createdDate = action.payload.createdDate;
            state.createdBy = action.payload.createdBy;
            state.updateDate = action.payload.updateDate;
            state.updateBy = action.payload.updateBy;
            state.deleteDate = action.payload.deleteDate;
            state.deleteBy = action.payload.deleteBy;
            state.active = action.payload.active;
            state.deleted = action.payload.deleted;
        }
    }
});

export const {
    hydrate,
    setStore
} = storeSlice.actions;

export const selectStore = ( state: RootState ) => state.storeState;

export default storeSlice.reducer;
