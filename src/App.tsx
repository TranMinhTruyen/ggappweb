import * as React from 'react';
import RouterList from "./components/drawer/RouterList";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch} from "./redux/hooks";
import StoreApi from "./common/api/StoreApi";
import {setStore} from "./redux/slices/storeSlice";

export default function App() {
	
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/');
	}, []);
	
	return (
		<RouterList/>
    );
}
