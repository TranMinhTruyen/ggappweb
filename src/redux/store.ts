import {configureStore} from "@reduxjs/toolkit";
import tokenSlice from "./slices/tokenSlice";
import thunk from 'redux-thunk';
import storeSlice from "./slices/storeSlice";

export const store = configureStore({
	reducer: {
		tokenState: tokenSlice,
		storeState: storeSlice
	},
	middleware: [thunk]
})

store.subscribe(()=> {
	localStorage.setItem('tokenState', JSON.stringify(store.getState().tokenState))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
