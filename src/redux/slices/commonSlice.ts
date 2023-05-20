import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AlertColor } from '@mui/material/Alert/Alert';

type CommonState = {
	theme: string,
	openLoginModal: boolean,
	openRegisterModal: boolean,
	openDrawer: boolean,
	isLogin: boolean,
	alertInfoHeight: number,
	alert: IAlertPrimaryDetail[]
}

export interface IAlertPrimaryDetail {
	alertSeverity: AlertColor;
	title: string;
	message: string;
}

const initialState: CommonState = {
	theme: '',
	openLoginModal: false,
	openRegisterModal: false,
	openDrawer: true,
	isLogin: false,
	alertInfoHeight: 0,
	alert: [{
		alertSeverity: 'error',
		title: 'Error alert',
		message: 'This is error alert'
	},
		{
			alertSeverity: 'success',
			title: 'Success alert',
			message: 'This is error alert'
		},
		{
			alertSeverity: 'warning',
			title: 'Warning alert',
			message: 'This is Warning alert'
		}]
};

export const commonSlice = createSlice({
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
		setOpenDrawer: (state, action: PayloadAction<boolean>) => {
			return {
				...state,
				openDrawer: action.payload,
			};
		},
		setIsLogin: (state, action: PayloadAction<boolean>) => {
			return {
				...state,
				isLogin: action.payload,
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
		removeAlert: (state, action: PayloadAction<IAlertPrimaryDetail[]>) => {
		
		}
	}
});

export const {
	setOpenLoginModal,
	setOpenRegisterModal,
	setOpenDrawer,
	setIsLogin,
	setAlert,
	setAlertInfoHeight
} = commonSlice.actions;

export const selectCommon = (state: RootState) => state.commonState;

export default commonSlice.reducer;