import { StoreResponse } from '../../common/dto/response/StoreResponse';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: StoreResponse = {
	id: 0,
	storeCode: '',
	storeAddress: '',
	province: null,
	manageId: 0,
	productStoreResponseList: null,
	productStoreIssueResponses: null,
	createdDate: '',
	createdBy: '',
	updateDate: '',
	updateBy: '',
	deleteDate: '',
	deleteBy: '',
	active: true,
	deleted: false
};

export const productSlice = createSlice({
	name: 'storeState',
	initialState,
	reducers: {
		setStore: (state, action: PayloadAction<StoreResponse>) => {
			return {
				...state,
				id: action.payload.id,
				storeCode: action.payload.storeCode,
				storeAddress: action.payload.storeAddress,
				province: action.payload.province,
				manageId: action.payload.manageId,
				productStoreResponseList: action.payload.productStoreResponseList,
				productStoreIssueResponses: action.payload.productStoreIssueResponses,
				createdDate: action.payload.createdDate,
				createdBy: action.payload.createdBy,
				updateDate: action.payload.updateDate,
				updateBy: action.payload.updateBy,
				deleteDate: action.payload.deleteDate,
				deleteBy: action.payload.deleteBy,
				active: action.payload.active,
				deleted: action.payload.deleted,
			};
		}
	}
});

export const {
	setStore
} = productSlice.actions;

export const selectStore = (state: RootState) => state.storeState;

export default productSlice.reducer;
