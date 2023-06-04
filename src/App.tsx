import * as React from 'react';
import RouterList from './common/RouterList';
import { store } from './redux/store';
import { setIsLogin } from './redux/slices/commonSlice';
import { setToken } from './redux/slices/tokenSlice';

const getTokenState = () => {
	try {
		let persistedState = localStorage.getItem('tokenState');
		if (persistedState) {
			store.dispatch(setIsLogin(true));
			return JSON.parse(persistedState);
		}
		
		persistedState = sessionStorage.getItem('tokenState');
		if (persistedState) {
			store.dispatch(setIsLogin(true));
			return JSON.parse(persistedState);
		}
	} catch (e) {
		console.log(e);
	}
};

const tokenState = getTokenState();

if (tokenState) {
	store.dispatch(setToken(tokenState));
}

const App = () => {
	return (
		<RouterList/>
	);
}

export default App;
