import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './slices/tokenSlice';
import thunk from 'redux-thunk';
import storeSlice from './slices/productSlice';
import commonSlice from './slices/commonSlice';
import masterSlice from '../common/sevices/master/masterSlice';

export const store = configureStore({
	reducer: {
		masterState: masterSlice,
		tokenState: tokenSlice,
		storeState: storeSlice,
		commonState: commonSlice,
	},
	middleware: [thunk]
});

// store.subscribe(()=> {
// 	localStorage.setItem('tokenState', JSON.stringify(store.getState().tokenState))
// })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
