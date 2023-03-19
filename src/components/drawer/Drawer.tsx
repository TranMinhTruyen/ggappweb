import React, {useState} from "react";
import {CSSObject, styled, Theme, useTheme} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import MuiAppBar from "@mui/material/AppBar";
import LoginModal from "../../screens/modal/LoginModal";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import {AccountCircleRounded} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {useNavigate} from "react-router-dom";
import DrawerMenu from "./DrawerMenu";
import RouterList from "./RouterList";
import {useAppSelector} from "../../redux/hooks";
import {selectToken} from "../../redux/slices/tokenSlice";
import RegisterModal from "../../screens/modal/RegisterModal";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
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

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const CustomDrawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
	({theme, open}) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		})
	}),
);

const Drawer = () => {
	const theme = useTheme();
	const [openDrawer, setOpenDrawer] = useState(true);
	const [openLoginDialog, setOpenLoginDialog] = useState(false);
	const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

	const userToken = useAppSelector(selectToken);

	const navigate = useNavigate();

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

	return (
		<Box sx={{ display: 'flex' }}>
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
				onClose={(value) => {handleOpenLoginDialog(true); handleOpenRegisterDialog(value)}}
				onBack={() => {handleOpenLoginDialog(true); handleOpenRegisterDialog(false)}}
			/>
			<CssBaseline/>
			<AppBar position="fixed" open={openDrawer} style={userToken.role === "ROLE_ADMIN" || userToken.role === "ROLE_EMP" ? {} : {backgroundColor: "#ff0000"}}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => handleDrawerOpen()}
						edge="start"
						sx={{
							marginRight: 5,
							...(openDrawer && {display: 'none'}),
						}}
					>
						<MenuIcon/>
					</IconButton>
					<Typography variant="h6" noWrap component="span" sx={{ flexGrow: 1 }} onClick={() => navigate("/")}>
						Gaming gear website
					</Typography>
					<Button
						color={"inherit"}
						startIcon={<AccountCircleRounded/>}
						onClick={() => handleOpenLoginDialog(true)}
					>
						Login
					</Button>
				</Toolbar>
			</AppBar>
			<CustomDrawer variant="permanent" open={openDrawer}>
				<DrawerHeader>
					<IconButton onClick={() => handleDrawerClose()}>
						{theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
					</IconButton>
				</DrawerHeader>
				<Divider/>
				<DrawerMenu
					isDrawerOpen={openDrawer}
					handleOpenDrawer={(value) =>
						{
							if (value) {
								handleDrawerOpen()
							}
						}
					}
				/>
			</CustomDrawer>
			<RouterList/>
		</Box>
	)
}
export default Drawer;
