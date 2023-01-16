import React, {useEffect} from 'react';
import './App.css';

import {useAppSelector, useAppDispatch} from "./redux/hooks";
import {setToken, TokenState} from "./redux/slices/tokenSlice";
import {Button, Container, Grid} from "@mui/material";

const App = () => {
	const token = useAppSelector(state => state.tokenSlice);
	const dispatch = useAppDispatch();
	const initToken: TokenState = {
		token: '',
		role: '',
		authorities: []
	}

	useEffect(() => {
		console.log('Token object:', token);
	}, [token]);

	const testSetToken = () => {
		initToken.token = 'test token';
		initToken.role = 'ROLE_ADMIN';
		initToken.authorities = ['CREATED', 'DELETED'];

		dispatch(setToken(initToken));
	}


	return (
		<div className={"App"}>
			<Container fixed={true}>
				<Button variant="contained" onClick={() => {testSetToken()}}>Test button</Button>
			</Container>
		</div>
	);
}

export default App;
