import React, {useEffect} from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useAppSelector} from "../../redux/hooks";
import {selectToken} from "../../redux/slices/tokenSlice";

const HomeComponent = () => {
	const userToken = useAppSelector(selectToken);

	useEffect(() => {
		console.log("Redux: ", userToken);
	},[userToken]);

	return (
		<Box>
			<Typography>Home</Typography>
			<Typography>Hello world</Typography>
		</Box>
	)
}

export default HomeComponent;
