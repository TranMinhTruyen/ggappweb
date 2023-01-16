import React, {useEffect, useState} from 'react';
import './App.css';

import {useAppSelector, useAppDispatch} from "./redux/hooks";
import {setToken, TokenState} from "./redux/slices/TokenSlice";
import {Button} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
	let token = useAppSelector(state => state.tokenSlice);
	const dispatch = useAppDispatch();
	const initToken: TokenState = {
		token: '',
		role: '',
		authorities: []
	}

	useEffect(() => {
		console.log('Token object before:', token);
	}, []);

	useEffect(() => {
		console.log('Token object after:', token);
	}, [token]);

	const testSetToken = () => {

		initToken.token = 'test token';
		initToken.role = 'ROLE_ADMIN';
		initToken.authorities = ['CREATED', 'DELETED'];

		dispatch(setToken(initToken));
	}


	return (
		<BrowserRouter>
			<Routes>
				<Route path={"/page1"} element={<div><p>Page1</p></div>}/>
				<Route path={"/page2"} element={<div><p>Hello Page 2</p></div>}/>
				<Route path={"/page3"} element={<div><p>Page3</p></div>}/>
				<Route path={"/page4"} element={<div><p>Page4</p></div>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
