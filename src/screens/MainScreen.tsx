import React from "react";
import Drawer from "../components/drawer/Drawer";
import Box from "@mui/material/Box";
import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import {clearToken} from "../redux/slices/tokenSlice";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {styled} from "@mui/material/styles";
import LoginModal from "./modal/LoginModal";
import RegisterModal from "./modal/RegisterModal";
import {
	selectCommon,
	setIsLogin,
	setOpenLoginModal,
} from "../redux/slices/commonSlice";
const drawerWidth = 250;

type ScreenLayoutProps = {
	openDrawer: boolean
}

const ScreenLayout = styled(Box, {shouldForwardProp: (prop) => prop !== 'openDrawer'})
	<ScreenLayoutProps>(({theme, openDrawer}) => ({
	zIndex: theme.zIndex.drawer + 1,
	marginTop: 75,
	paddingLeft: 10,
	paddingRight: 10,
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

	const dispatch = useAppDispatch();
	const commonState = useAppSelector(selectCommon);

	const handleLogout = () => {
		dispatch(clearToken());
		dispatch(setIsLogin(false));
		sessionStorage.removeItem('tokenState');
		localStorage.removeItem('tokenState');
	}

	return (
		<Box>
			<Header drawerWidth={drawerWidth}
			        handleLogout={handleLogout}
			/>
			<Drawer
				drawerWidth={drawerWidth}
			/>
			<LoginModal
				open={commonState.openLoginModal}
				title={"Login Modal"}
				onClose={(value) => dispatch(setOpenLoginModal(value))}
			/>
			<RegisterModal
				open={commonState.openRegisterModal}
				back={true}
				title={"Register Modal"}
			/>
			<ScreenLayout openDrawer={commonState.openDrawer}>
				<Outlet/>
			</ScreenLayout>
		</Box>
	)
}

export default MainScreen;
