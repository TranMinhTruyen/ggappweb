import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { SelectOption } from 'common/types';

export interface StoreState {
	id: number | string;
	storeCode?: string;
	storeOption: SelectOption[];
}

const initialState: StoreState = {
	id: '',
	storeOption: [],
};

export const storeSlice = createSlice({
	name: 'storeState',
	initialState,
	reducers: {
		setStoreOption: (state, action: PayloadAction<SelectOption[]>) => {
			const { payload } = action;
			return {
				...state,
				storeOption: payload,
			};
		},
		setStoreId:  (state, action: PayloadAction<number>) => {
			const { payload } = action;
			sessionStorage.setItem('storeSelect', JSON.stringify(payload));
			return {
				...state,
				id: payload,
			};
		},
	}
});

export const {
	setStoreOption,
	setStoreId,
} = storeSlice.actions;

export const selectStore = (state: RootState) => state.storeState;
export const selectStoreId = (state: RootState) => state.storeState.id;
export const selectStoreOption = (state: RootState) => state.storeState.storeOption;

export default storeSlice.reducer;
