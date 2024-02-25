import { AlertColor } from '@mui/material/Alert/Alert';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface CommonState {
	theme: string,
	isOpenDrawer: boolean,
	isOpenErrorDialog: boolean,
	alertInfoHeight: number,
	alert: IAlertPrimaryDetail[],
}

export interface IAlertPrimaryDetail {
	alertSeverity: AlertColor;
	title: string;
	message: string;
}

const initialState: CommonState = {
	theme: '',
	isOpenDrawer: true,
	isOpenErrorDialog: false,
	alertInfoHeight: 0,
	alert: [],
};

export const mainSlice = createSlice({
	name: 'commonState',
	initialState,
	reducers: {
		setOpenLoginModal: (state, action: PayloadAction<boolean>) => {
			return {
				...state,
				openLoginModal: action.payload,
			};
		},
		setOpenRegisterModal: (state, action: PayloadAction<boolean>) => {
			return {
				...state,
				openRegisterModal: action.payload,
			};
		},
		toggleDrawer: (state) => {
			return {
				...state,
				isOpenDrawer: !state.isOpenDrawer,
			};
		},
		setAlert: (state, action: PayloadAction<IAlertPrimaryDetail[]>) => {
			return {
				...state,
				alert: action.payload,
			};
		},
		setAlertInfoHeight: (state, action: PayloadAction<number>) => {
			return {
				...state,
				alertInfoHeight: action.payload,
			};
		},
	}
});

export const {
	setOpenRegisterModal,
	toggleDrawer,
	setAlert,
	setAlertInfoHeight,
} = mainSlice.actions;

export const selectCommon = (state: RootState) => state.mainState;
export const selectOpenDrawer = (state: RootState) => state.mainState.isOpenDrawer;
export const selectAlert = (state: RootState) => state.mainState.alert;
export const selectAlertInfoHeight = (state: RootState) => state.mainState.alertInfoHeight;

export default mainSlice.reducer;