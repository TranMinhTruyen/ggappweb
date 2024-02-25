import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'common/sevices/auth/authSlice';
import cartSlice from 'common/sevices/cart/cartSlice';
import loginSlice from 'common/sevices/login/loginSlice';
import masterSlice from 'common/sevices/master/masterSlice';
import registerSlice from 'common/sevices/register/registerSlice';
import storeSlice from 'common/sevices/store/storeSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import mainSlice from 'common/sevices/main/mainSlice';

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
	middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;