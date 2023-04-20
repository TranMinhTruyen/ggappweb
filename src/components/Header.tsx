import React, {useEffect} from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {AccountCircleRounded} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {selectToken} from "../redux/slices/tokenSlice";
import {useNavigate} from "react-router-dom";
import CommonFormControl from "./CommonFormControl";
import {
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent
} from "@mui/material";
import {selectStore, setStore} from "../redux/slices/storeSlice";
import {StoreResponse} from "../common/dto/response/StoreResponse";
import {PaginationResponse} from "../common/dto/response/PaginationResponse";
import StoreApi from "../common/api/StoreApi";
import StoreSelect from "./select/StoreSelect";

type IHeaderProps = {
	drawerWidth: number;
	openDrawer: boolean;
	handleDrawerOpen: () => void;
	handleDrawerClose: () => void;
	handleOpenLoginDialog: (value: boolean) => void;
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

	const { drawerWidth, openDrawer, handleDrawerOpen, handleLogout, handleOpenLoginDialog } = props;

	const userToken = useAppSelector(selectToken);

	const navigate = useNavigate();

	return (
		<AppBar drawerWidth={drawerWidth}
		        position="fixed"
		        open={openDrawer}
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
						...(openDrawer && {display: 'none'}),
					}}
				>
					<MenuIcon/>
				</IconButton>
				<>
					<Typography variant="h6" noWrap component="span" sx={{ flexGrow: 1 }} onClick={() => navigate("/")}>
						Gaming gear website
					</Typography>
				</>
				<>
					<StoreSelect/>
				</>
				{
					userToken.accessToken === "" ?
						<Button
							color={"inherit"}
							startIcon={<AccountCircleRounded/>}
							onClick={() => handleOpenLoginDialog(true)}
						>
							Login
						</Button> : <Button
							color={"inherit"}
							startIcon={<AccountCircleRounded/>}
							onClick={() => handleLogout()}
						>
							Logout
						</Button>
				}
			</Toolbar>
		</AppBar>
	)
}
export default React.memo(Header);
