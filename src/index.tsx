import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import './index.css';
import {BrowserRouter} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {hydrate} from "./redux/slices/tokenSlice";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const getTokenState = () => {
    try {
        const persistedState = localStorage.getItem('tokenState')
        if (persistedState)
            return JSON.parse(persistedState)
    }
    catch (e){
        console.log(e)
    }
}

const tokenState = getTokenState()

if (tokenState) {
    store.dispatch(hydrate(tokenState))
}

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <CssBaseline />
            <App/>
        </BrowserRouter>
    </Provider>
);
