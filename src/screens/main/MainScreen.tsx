import React from 'react';
import Drawer from '../../components/drawer/Drawer';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import { clearToken } from '../../redux/slices/tokenSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { styled } from '@mui/material/styles';
import LoginModal from '../main/modal/LoginModal';
import RegisterModal from '../main/modal/RegisterModal';
import { setIsLogin } from '../../redux/slices/commonSlice';
import { RootState } from '../../redux/store';
import { shallowEqual } from 'react-redux';
import MainScreenAlertList from './MainScreenAlertList';

const drawerWidth = 250;

interface ScreenLayoutProps {
	openDrawer: boolean;
}

const ScreenLayout = styled(Box, { shouldForwardProp: (prop) => prop !== 'openDrawer' })
	< ScreenLayoutProps > (({ theme, openDrawer }) => ({
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
	
	const { openDrawer } = useAppSelector(
		(state: RootState) => ({ openDrawer: state.commonState.openDrawer }),
		shallowEqual
	);
	
	const handleLogout = () => {
		dispatch(clearToken());
		dispatch(setIsLogin(false));
		sessionStorage.removeItem('tokenState');
		localStorage.removeItem('tokenState');
	};
	
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
				<MainScreenAlertList/>
				<Outlet/>
			</ScreenLayout>
		</Box>
	);
};

export default MainScreen;
