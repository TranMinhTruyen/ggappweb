import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useAppSelector } from 'app/store';
import { selectOpenDrawer } from 'common/sevices/main/mainSlice';
import Drawer from 'components/drawer/Drawer';
import Header from 'components/Header';
import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import LoginModal from 'screens/main/login/LoginModal';
import RegisterModal from 'screens/main/register/RegisterModal';
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
	const openDrawer = useAppSelector(selectOpenDrawer);
	
	return (
		<Box>
			<Header drawerWidth={drawerWidth}/>
			<Drawer
				key={'drawer'}
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

export default memo(MainScreen);
