import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AlertColor } from '@mui/material/Alert/Alert';
import { IMasterResponse } from '../../common/dto/response/MasterResponse';

type CommonState = {
	theme: string,
	openLoginModal: boolean,
	openRegisterModal: boolean,
	openDrawer: boolean,
	isLogin: boolean,
	alertInfoHeight: number,
	alert: IAlertPrimaryDetail[],
	authorityMaster: IMasterResponse[],
	roleMaster: IMasterResponse[],
	positionMaster: IMasterResponse[],
	levelMaster: IMasterResponse[],
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
	alert: [
		{
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
		}
	],
	authorityMaster: [],
	roleMaster: [],
	positionMaster: [],
	levelMaster: [],
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
		
		},
		setAuthorityMaster: (state, action: PayloadAction<IMasterResponse[]>) => {
			return {
				...state,
				authorityMaster: action.payload,
			}
		},
		setRoleMaster: (state, action: PayloadAction<IMasterResponse[]>) => {
			return {
				...state,
				roleMaster: action.payload,
			}
		},
		setPositionMaster: (state, action: PayloadAction<IMasterResponse[]>) => {
			return {
				...state,
				positionMaster: action.payload,
			}
		},
		setLevelMaster: (state, action: PayloadAction<IMasterResponse[]>) => {
			return {
				...state,
				levelMaster: action.payload,
			}
		},
	}
});

export const {
	setOpenLoginModal,
	setOpenRegisterModal,
	setOpenDrawer,
	setIsLogin,
	setAlert,
	setAlertInfoHeight,
	setAuthorityMaster,
	setRoleMaster,
	setPositionMaster,
	setLevelMaster,
} = commonSlice.actions;

export const selectCommon = (state: RootState) => state.commonState;

export default commonSlice.reducer;