import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "../store";

export interface TokenState {
	token: string,
	role: string,
	authorities: string[]
}

const initialState: TokenState = {
	token: '',
	role: '',
	authorities: []
};

export const TokenSlice = createSlice({
	name: 'tokenSlice',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<TokenState>) => {
			state.token = action.payload.token;
			state.role = action.payload.role;
			state.authorities = action.payload.authorities;
		}
	}
});

export const { setToken } = TokenSlice.actions;

export const selectToken = ( state: RootState ) => state.tokenSlice;

export default TokenSlice.reducer;
