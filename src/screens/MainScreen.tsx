import React, {useState} from "react";
import Drawer from "../components/drawer/Drawer";
import Box from "@mui/material/Box";
import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import {clearToken} from "../redux/slices/tokenSlice";
import {useAppDispatch} from "../redux/hooks";
import {styled} from "@mui/material/styles";
import LoginModal from "./modal/LoginModal";
import RegisterModal from "./modal/RegisterModal";
import CssBaseline from "@mui/material/CssBaseline";

const drawerWidth = 250;

type ScreenLayoutProps = {
	openDrawer?: boolean
}

const ScreenLayout = styled(Box, {shouldForwardProp: (prop) => prop !== 'openDrawer'})<ScreenLayoutProps>(({theme, openDrawer}) => ({
	zIndex: theme.zIndex.drawer + 1,
	marginTop: 60,
	padding: 10,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(openDrawer && {
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
	...(!openDrawer && {
		marginLeft: `calc(${theme.spacing(8)} + 6px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const MainScreen = () => {
	
	const [openDrawer, setOpenDrawer] = useState(true);
	const [openLoginDialog, setOpenLoginDialog] = useState(false);
	const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
	const dispatch = useAppDispatch();
	
	const handleDrawerOpen = () => {
		setOpenDrawer(true);
	};
	
	const handleDrawerClose = () => {
		setOpenDrawer(false);
	};
	
	const handleOpenLoginDialog = (isOpen: boolean) => {
		setOpenLoginDialog(isOpen);
	}
	
	const handleOpenRegisterDialog = (isOpen: boolean) => {
		setOpenLoginDialog(!openLoginDialog);
		setOpenRegisterDialog(isOpen);
	}
	
	const handleLogout = () => {
		dispatch(clearToken())
	}
	
	return (
		<Box>
			<Header drawerWidth={drawerWidth}
			        handleOpenLoginDialog={handleOpenLoginDialog}
			        handleLogout={handleLogout}
			        openDrawer={openDrawer}
			        handleDrawerOpen={handleDrawerOpen}
			        handleDrawerClose={handleDrawerClose}
			/>
			<Drawer
				drawerWidth={drawerWidth}
				openDrawer={openDrawer}
				handleDrawerOpen={handleDrawerOpen}
				handleDrawerClose={handleDrawerClose}
			/>
			<LoginModal
				open={openLoginDialog}
				openRegister={(value) => handleOpenRegisterDialog(value)}
				title={"Login Modal"}
				onClose={(value) => handleOpenLoginDialog(value)}
			/>
			<RegisterModal
				open={openRegisterDialog}
				back={true}
				title={"Register Modal"}
				onClose={() => {handleOpenLoginDialog(true); handleOpenRegisterDialog(false)}}
				onBack={() => {handleOpenLoginDialog(true); handleOpenRegisterDialog(false)}}
			/>
			<CssBaseline/>
			<ScreenLayout openDrawer={openDrawer}>
				<Outlet/>
			</ScreenLayout>
		</Box>
	)
}

export default MainScreen;