import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "../store";
import {LoginResponse} from "../../common/dto/response/LoginResponse";

const initialState: LoginResponse = {
	accessToken: "",
	userFullName: "",
	role: "",
	authorities: [],
	accountSettingsResponse: null
};

export const tokenSlice = createSlice({
	name: 'tokenState',
	initialState,
	reducers: {
		hydrate: (state, action: PayloadAction<LoginResponse>) => {
			return action.payload
		},
		setToken: (state, action: PayloadAction<LoginResponse>) => {
			state.accessToken = action.payload.accessToken;
			state.userFullName = action.payload.userFullName;
			state.role = action.payload.role;
			state.authorities = action.payload.authorities;
			state.accountSettingsResponse = action.payload.accountSettingsResponse;
		},
		clearToken: (state) => {
			state.accessToken = "";
			state.userFullName = "";
			state.role = "";
			state.authorities = [];
			state.accountSettingsResponse = null;
		}
	}
});

export const { setToken, clearToken, hydrate} = tokenSlice.actions;

export const selectToken = ( state: RootState ) => state.tokenState;

export default tokenSlice.reducer;
