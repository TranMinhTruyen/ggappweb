import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ComponentRouters, {ComponentTabItem} from "./ComponentRouters";
import * as React from "react";

import { useNavigate , useLocation } from "react-router-dom";
import {useAppSelector} from "../../redux/hooks";
import {selectToken} from "../../redux/slices/tokenSlice";

const itemList = ComponentRouters;

interface IMenuProps {
	isDrawerOpen: boolean
}

interface IMenuItemProps {
	isDrawerOpen: boolean,
	item: ComponentTabItem
}

const MenuItem = ({ isDrawerOpen, item }: IMenuItemProps) => {
	
	const navigate = useNavigate();
	const location = useLocation();
	
	const { pathname } = location;
	
	const handleRoute = (path: string) => navigate(path);
	
	return (
		<ListItem
			onClick={() => handleRoute(item.componentPath)}
			disablePadding
			sx={{ display: 'block' }}
		>
			<ListItemButton
				sx={{
					minHeight: 48,
					justifyContent: isDrawerOpen ? 'initial' : 'center',
					px: 2.5,
				}}
			>
				<ListItemIcon
					style={pathname === item.componentPath ? {color: "#ff0000"} : {color: "#7c7c7c"}}
					sx={{
						minWidth: 0,
						mr: isDrawerOpen ? 3 : 'auto',
						justifyContent: 'center',
					}}
				>
					{item.componentIcon}
				</ListItemIcon>
				<ListItemText
					primary={item.componentLabel}
					style={pathname === item.componentPath ? {color: "#ff0000"} : {color: "#7c7c7c"}}
					sx={{ opacity: isDrawerOpen ? 1 : 0 }}
				/>
			</ListItemButton>
		</ListItem>
	)
}

const Menu = ({ isDrawerOpen }: IMenuProps) => {
	
	const userToken = useAppSelector(selectToken);
	
	return (
		<List>
			{itemList.map((item) => (
				item.componentRole != null ?
					userToken.role !== "" && item.componentRole.includes(userToken.role) ?
						<MenuItem key={item.componentKey} item={item} isDrawerOpen={isDrawerOpen}/>
						: null
					: <MenuItem key={item.componentKey} item={item} isDrawerOpen={isDrawerOpen}/>
			))}
		</List>
	)
}
export default Menu;