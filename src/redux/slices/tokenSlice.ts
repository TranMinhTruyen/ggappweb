import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LoginResponse } from '../../common/dto/response/LoginResponse';

const initialState: LoginResponse = {
	accessToken: '',
	userFullName: '',
	role: '',
	authorities: [],
	accountSettingsResponse: null
};

export const tokenSlice = createSlice({
	name: 'tokenState',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<LoginResponse>) => {
			return {
				...state,
				accessToken: action.payload.accessToken,
				userFullName: action.payload.userFullName,
				role: action.payload.role,
				authorities: action.payload.authorities,
				accountSettingsResponse: action.payload.accountSettingsResponse,
			};
		},
		clearToken: () => {
			return initialState;
		}
	}
});

export const {
	setToken,
	clearToken,
} = tokenSlice.actions;

export const selectToken = (state: RootState) => state.tokenState;

export default tokenSlice.reducer;
