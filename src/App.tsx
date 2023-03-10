import * as React from 'react';
import {SyntheticEvent, useState} from 'react';
import {CSSObject, styled, Theme, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Container, Tab, Tabs} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomeComponent from "./components/Home/HomeComponent";
import {AccountCircleRounded, Home} from "@mui/icons-material";
import LoginDialog from "./components/Login/LoginDialog";
import Grid2 from "@mui/material/Unstable_Grid2";
import Divider from '@mui/material/Divider';
import ListTab from "./components/ListTab/ListTab";

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
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
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

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
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
        }),
    }),
);

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}



function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Container sx={{ p: 3 }}>{children}</Container>
			)}
		</div>
	);
}


export default function App() {
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = useState(true);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
	const [value, setValue] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const handleOpenLoginDialog = (isOpen: boolean) => {
      setOpenLoginDialog(isOpen);
    }

	return (
        <Box sx={{display: 'flex'}}>
            <LoginDialog
                open={openLoginDialog}
                title={"Login Modal"}
                onClose={() => handleOpenLoginDialog(false)}/>
            <CssBaseline/>
            <AppBar position="fixed" open={openDrawer}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(openDrawer && {display: 'none'}),
                        }}
                    >
	                    <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="span" sx={{ flexGrow: 1 }}>
                        Mini variant drawer
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
            <Drawer variant="permanent" open={openDrawer}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
				<ListTab value={value} onChange={handleChange} isDrawerOpen={openDrawer}></ListTab>
            </Drawer>
			<Grid2 component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader/>
				<TabPanel value={value} index={0}>
					<HomeComponent></HomeComponent>
				</TabPanel>
				<TabPanel value={value} index={1}>
                    <Typography component="span">Item 1</Typography>
				</TabPanel>
				<TabPanel value={value} index={2}>
                    <Typography component="span">Item 2</Typography>
				</TabPanel>
			</Grid2>
        </Box>
    );
}
