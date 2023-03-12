import * as React from 'react';
import Drawer from "./components/Drawer/Drawer";
import Box from "@mui/material/Box";
import {Outlet} from "react-router-dom";


export default function App() {
	return (
		<Box component="main">
			<Drawer></Drawer>
			<Outlet/>
		</Box>
    );
}
