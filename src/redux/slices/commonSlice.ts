import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

type CommonState = {
    theme: string,
    openLoginModal: boolean,
    openRegisterModal: boolean,
    openDrawer: boolean,
    isLogin: boolean
}

const initialState: CommonState = {
    theme: "",
    openLoginModal: false,
    openRegisterModal: false,
    openDrawer: true,
    isLogin: false
};

export const commonSlice = createSlice({
    name: 'commonState',
    initialState,
    reducers: {
        setOpenLoginModal: (state, action: PayloadAction<boolean>) => {
            state.openLoginModal = action.payload;
        },
        setOpenRegisterModal: (state, action: PayloadAction<boolean>) => {
            state.openRegisterModal = action.payload;
        },
        setOpenDrawer: (state, action: PayloadAction<boolean>) => {
            state.openDrawer = action.payload;
        },
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
        },
    }
});

export const {
    setOpenLoginModal,
    setOpenRegisterModal,
    setOpenDrawer,
    setIsLogin
} = commonSlice.actions;

export const selectCommon = ( state: RootState ) => state.commonState;

export default commonSlice.reducer;