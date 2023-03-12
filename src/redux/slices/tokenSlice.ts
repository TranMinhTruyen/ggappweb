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
	name: 'tokenSlice',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<LoginResponse>) => {
			state.accessToken = action.payload.accessToken;
			state.userFullName = action.payload.userFullName;
			state.role = action.payload.role;
			state.authorities = action.payload.authorities;
			state.accountSettingsResponse = action.payload.accountSettingsResponse;
		}
	}
});

export const { setToken } = tokenSlice.actions;

export const selectToken = ( state: RootState ) => state.tokenSlice;

export default tokenSlice.reducer;
