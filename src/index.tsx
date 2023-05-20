import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { setToken } from './redux/slices/tokenSlice';
import { setIsLogin } from './redux/slices/commonSlice';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

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

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<CssBaseline/>
			<App/>
		</BrowserRouter>
	</Provider>
);
