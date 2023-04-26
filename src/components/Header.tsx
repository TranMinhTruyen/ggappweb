import React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {AccountCircleRounded} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import {selectToken} from "../redux/slices/tokenSlice";
import {useNavigate} from "react-router-dom";
import StoreSelect from "./select/StoreSelect";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {selectCommon, setOpenDrawer, setOpenLoginModal} from "../redux/slices/commonSlice";
import CommonButton from "./CommonButton";
import Grid2 from "@mui/material/Unstable_Grid2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CommonIconButton from "./CommonIconButton";

type IHeaderProps = {
	drawerWidth: number;
	handleLogout: () => void;
}

interface AppBarProps extends MuiAppBarProps {
	drawerWidth?: number;
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<AppBarProps>(({theme, open, drawerWidth}) => ({
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

const Header = (props: IHeaderProps) => {

	const { drawerWidth, handleLogout } = props;
	const userToken = useAppSelector(selectToken);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const commonState = useAppSelector(selectCommon);

	const handleDrawerOpen = () => {
		dispatch(setOpenDrawer(true));
	}

	return (
		<AppBar drawerWidth={drawerWidth}
		        position="fixed"
		        open={commonState.openDrawer}
		        style={userToken.role === "ROLE_ADMIN" || userToken.role === "ROLE_EMP" ? {} : {backgroundColor: "#ff0000"}}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					sx={{
						marginRight: 5,
						...(commonState.openDrawer && {display: 'none'}),
					}}
				>
					<MenuIcon/>
				</IconButton>
				<>
					<Typography variant="h6" noWrap component="span" sx={{ flexGrow: 1 }} onClick={() => navigate("/")}>
						Gaming gear website
					</Typography>
				</>
				<Grid2 container spacing={2}>
					<Grid2>
						<StoreSelect/>
					</Grid2>
					{
						userToken.accessToken !== "" ?
							<Grid2>
								<CommonIconButton
									backgroundColor={"#ffffff"}
									icon={<ShoppingCartIcon/>}
									onClick={() => {}}
									variant="contained"
								/>
							</Grid2> : null
					}
					{
						userToken.accessToken === "" ?
							<Grid2>
								<CommonButton
									width={130}
									height={35}
									backgroundColor={"#ffffff"}
									labelColor={"#000000"}
									startIcon={<AccountCircleRounded/>}
									variant="contained" onClick={() => dispatch(setOpenLoginModal(true))}
									label={"Login"}
								/>
							</Grid2>
							:
							<Grid2>
								<CommonButton
									width={130}
									height={35}
									backgroundColor={"#ffffff"}
									labelColor={"#000000"}
									startIcon={<AccountCircleRounded/>}
									variant="contained" onClick={() => handleLogout()}
									label={"Logout"}
								/>
							</Grid2>
					}
				</Grid2>
			</Toolbar>
		</AppBar>
	)
}
export default React.memo(Header);
