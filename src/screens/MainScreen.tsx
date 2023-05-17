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
import {setAlert, setIsLogin} from "../redux/slices/commonSlice";
import {RootState} from "../redux/store";
import {shallowEqual} from "react-redux";
import AlertList from "../components/AlertList";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {AlertTitle} from "@mui/material";

const drawerWidth = 250;

type ScreenLayoutProps = {
	openDrawer: boolean
}

const ScreenLayout = styled(Box, {shouldForwardProp: (prop) => prop !== 'openDrawer'})
	< ScreenLayoutProps > (({theme, openDrawer}) => ({
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
	
	const {openDrawer} = useAppSelector(
		(state: RootState) => ({openDrawer: state.commonState.openDrawer}),
		shallowEqual
	);
	
	const {alert} = useAppSelector(
		(state: RootState) => ({alert: state.commonState.alert}),
		shallowEqual
	);
	
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
			<LoginModal/>
			<RegisterModal/>
			<ScreenLayout component={'main'} openDrawer={openDrawer}>
				<AlertList>
					{alert.map((alertItem) => (
						<Alert
							key={alert.indexOf(alertItem)}
							severity={alertItem.alertSeverity}
							variant={"filled"}
							action={
								<IconButton
									aria-label="close"
									color="inherit"
									size="small"
									onClick={() => {
										dispatch(setAlert(alert.filter((item) => item !== alertItem)))
									}}
								>
									<CloseIcon fontSize="inherit"/>
								</IconButton>
							}
							sx={{mb: 2}}
						>
							<AlertTitle>{alertItem.title}</AlertTitle>
							{alertItem.message}
						</Alert>
					))}
				</AlertList>
				<Outlet/>
			</ScreenLayout>
		</Box>
	)
}

export default MainScreen;
