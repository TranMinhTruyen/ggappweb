import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { LoginResponse } from 'common/dto/response/LoginResponse';

export interface AuthState extends LoginResponse {
    isRemember?: boolean;
    isLogin?: boolean;
}

const initialState: AuthState = {
    accessToken: '',
    userFullName: '',
    role: '',
    authorities: [],
    accountSettingsResponse: null,
    isRemember: false,
    isLogin: false,
};

export const authSlice = createSlice({
    name: 'authState',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            const { payload } = action;
            if (payload.isRemember) {
                localStorage.setItem('auth', JSON.stringify(payload));
            } else {
                sessionStorage.setItem('auth', JSON.stringify(payload));
            }
            return {
                ...state,
                accessToken: payload.accessToken,
                userFullName: payload.userFullName,
                role: payload.role,
                authorities: payload.authorities,
                accountSettingsResponse: payload.accountSettingsResponse,
                isRemember: payload.isRemember,
                isLogin: true,
            };
        },
        clearAuth: () => {
            sessionStorage.removeItem('auth');
            localStorage.removeItem('auth');
            return initialState;
        },
    },
});

export const { setAuth, clearAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.authState;
export const selectAccessToken = (state: RootState) => state.authState.accessToken;
export const selectRole = (state: RootState) => state.authState.role;
export const selectIsLogin = (state: RootState) => state.authState.isLogin;

export default authSlice.reducer;
