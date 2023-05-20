import * as React from 'react';
import { useEffect } from 'react';
import RouterList from './components/drawer/RouterList';
import { useNavigate } from 'react-router-dom';

export default function App() {
	
	const navigate = useNavigate();
	
	useEffect(() => {
		navigate('/');
		// eslint-disable-next-line
	}, []);
	
	return (
		<RouterList/>
	);
}
