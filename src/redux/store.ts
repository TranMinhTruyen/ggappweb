import {configureStore} from "@reduxjs/toolkit";
import tokenSlice from "./slices/TokenSlice";
import thunk from 'redux-thunk';

export const store = configureStore({
	reducer: {
		tokenSlice: tokenSlice
	},
	middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch