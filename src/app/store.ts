import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'services/auth/authSlice';
import cartSlice from 'services/cart/cartSlice';
import loginSlice from 'services/login/loginSlice';
import masterSlice from 'services/master/masterSlice';
import registerSlice from 'services/register/registerSlice';
import storeSlice from 'services/store/storeSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import mainSlice from 'services/main/mainSlice';

export const store = configureStore({
    reducer: {
        masterState: masterSlice,
        authState: authSlice,
        storeState: storeSlice,
        mainState: mainSlice,
        loginState: loginSlice,
        registerState: registerSlice,
        cartState: cartSlice,
    },
    middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
