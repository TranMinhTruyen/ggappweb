import React, {useEffect, useState} from 'react';
import './App.css';

import {useAppSelector, useAppDispatch} from "./redux/hooks";
import {setToken, TokenState} from "./redux/slices/TokenSlice";
import {PrimaryButton} from "@fluentui/react";

const App = () => {
	const token = useAppSelector(state => state.tokenSlice);
	const dispatch = useAppDispatch();
	const initToken: TokenState = {
		token: '',
		role: '',
		authorities: []
	}
	const [tokenObject, setTokenObject] = useState(initToken);
	
	useEffect(() => {
		console.log('Token object:', tokenObject);
	}, []);
	
	const testSetToken = () => {
		setTokenObject(tokenObject => ({
			...tokenObject,
			token: 'test token',
			role: 'ROLE_ADMIN',
			authorities: ['CREATED', 'DELETED']
		}))
		
		dispatch(setToken(tokenObject));
		console.log('Token object:', tokenObject);
	}
	
	return (
		<div className="App">
			<PrimaryButton text={'Set Token'} onClick={testSetToken}/>
		</div>
	);
}

export default App;
