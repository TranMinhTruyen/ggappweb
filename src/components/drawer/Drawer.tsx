import React from "react";
import {CSSObject, styled, Theme, useTheme} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DrawerMenu from "./DrawerMenu";
import {DrawerProps} from "@mui/material/Drawer/Drawer";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setOpenDrawer} from "../../redux/slices/commonSlice";
import {RootState} from "../../redux/store";
import {shallowEqual} from "react-redux";

type IDrawerProps = {
	drawerWidth: number;
}

interface CustomDrawerProps extends DrawerProps {
	drawerWidth?: number;
}

const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 6px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 6px)`,
	},
});

const DrawerHeader = styled('div')(({theme}) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

const CustomDrawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<CustomDrawerProps>(({theme, open, drawerWidth}) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme, drawerWidth !== undefined ? drawerWidth : 250),
			'& .MuiDrawer-paper': openedMixin(theme, drawerWidth !== undefined ? drawerWidth : 250),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		})
	})
);

const Drawer = (props: IDrawerProps) => {
	
	const {drawerWidth} = props;
	const dispatch = useAppDispatch();
	const theme = useTheme();
	const {openDrawer} = useAppSelector(
		(state: RootState) => ({openDrawer: state.commonState.openDrawer}),
		shallowEqual
	);
	
	return (
		<CustomDrawer drawerWidth={drawerWidth} variant="permanent" open={openDrawer}>
			<DrawerHeader>
				<IconButton onClick={() => dispatch(setOpenDrawer(false))}>
					{theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
				</IconButton>
			</DrawerHeader>
			<Divider/>
			<DrawerMenu/>
		</CustomDrawer>
	)
}
export default React.memo(Drawer);
