import React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {AccountCircleRounded} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import {useAppSelector} from "../redux/hooks";
import {selectToken} from "../redux/slices/tokenSlice";
import {useNavigate} from "react-router-dom";
import CommonFormControl from "./CommonFormControl";
import {Checkbox, FormControl, ListItemText, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {selectStore} from "../redux/slices/storeSlice";
import {StoreResponse} from "../common/dto/response/StoreResponse";

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

const StoreSelect = () => {

	const [storeSelect, setStoreSelect] = React.useState<StoreResponse | any>({
		id: 0,
		storeCode: "",
		storeAddress: "",
		province: null,
		manageId: 0,
		productStoreResponseList: null,
		productStoreIssueResponses: null,
		createdDate: "",
		createdBy: "",
		updateDate: "",
		updateBy: "",
		deleteDate: "",
		deleteBy: "",
		active: true,
		deleted: false
	});

	const handleChange = (id: number) => {
		let update = storeSlice.data.find((store) => store.id === id)
		setStoreSelect(update);
	};

	const storeSlice = useAppSelector(selectStore);

	console.log(storeSlice)

	return (
		<FormControl sx={{ width: 300 }}>
			<Select
				value={storeSelect}
				onChange={(event: SelectChangeEvent) => handleChange(parseInt(event.target.value))}
				renderValue={() => storeSelect.storeCode}
				defaultValue={"1"}
			>
				{storeSlice.data.map((item) => (
					<MenuItem key={item.id} value={item.id}>
						<Checkbox checked={item.id === storeSelect.id} />
						<ListItemText primary={item.storeCode} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

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
