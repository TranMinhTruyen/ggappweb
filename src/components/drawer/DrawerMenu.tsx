import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import * as React from "react";

import { useNavigate , useLocation } from "react-router-dom";
import {useAppSelector} from "../../redux/hooks";
import {selectToken} from "../../redux/slices/tokenSlice";
import {useEffect, useState} from "react";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Collapse from '@mui/material/Collapse';
import Divider from "@mui/material/Divider";
import DrawerItemList, {DrawerItem} from "./DrawerItems";

const itemList = DrawerItemList;

interface IMenuProps {
	isDrawerOpen: boolean;
	handleOpenDrawer: (value: boolean) => void;
}

interface IMenuItemProps {
	isDrawerOpen: boolean;
	item: DrawerItem;
	handleOpenDrawer?: (value: boolean) => void;
}

const DrawerMenuItem = ({ isDrawerOpen, item}: IMenuItemProps) => {

	const navigate = useNavigate();
	const location = useLocation();

	const { pathname } = location;

	const handleRoute = (path: string) => navigate(path);

	return (
		<Box>
			<ListItem
				style={
					pathname === item.componentPath ?
					{
						borderRadius: 25,
						backgroundColor: "#cdf6ff",
						color: "#ff0000"
					}
					: {
						backgroundColor: "#ffffff",
						color: "#7c7c7c"
					}
				}
				onClick={() => handleRoute(item.componentPath)}
				disablePadding
				sx={{ display: 'block' }}
			>
				<ListItemButton
					sx={{
						minHeight: 48,
						justifyContent: isDrawerOpen ? 'initial' : 'center',
						px: 2.5,
						":hover": {
							borderRadius: 25,
							backgroundColor: "#d9d8d8"
						},
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
		</Box>
	)
}

const DrawerMenuItemWithChild = ({ isDrawerOpen, item, handleOpenDrawer }: IMenuItemProps) => {

	const navigate = useNavigate();
	const location = useLocation();
	const [openChild, setOpenChild] = useState<boolean>(false);
	// const [childPath, setChildPath] = useState<string>("");

	const { pathname } = location;

	const handleRoute = (path: string) => {
		navigate(path);
		// setChildPath(path);
	};

	const handleExpand = (item: DrawerItem) => {
		const childPath = item.componentChild?.at(0);
		if (childPath !== null && childPath !== undefined) {
			handleRoute(childPath.componentPath);
		}
		if (!isDrawerOpen) {
			if (handleOpenDrawer) {
				handleOpenDrawer(true);
			}
		}
		setOpenChild(!openChild);
	};

	// useEffect(() => {
	// 	if (!childPath.includes(pathname) || pathname === "/") {
	// 		setOpenChild(false);
	// 	}
	// }, [childPath, pathname]);

	useEffect(() => {
		if (!isDrawerOpen) {
			setOpenChild(isDrawerOpen);
		}
	}, [isDrawerOpen]);

	return (
		<Box>
			<ListItem
				onClick={() => handleExpand(item)}
				disablePadding
				sx={{ display: 'block' }}
			>
				<ListItemButton
					sx={{
						minHeight: 48,
						justifyContent: isDrawerOpen ? 'initial' : 'center',
						px: 2.5,
						":hover": {
							borderRadius: 25,
							backgroundColor: "#d9d8d8"
						},
						color: "#7c7c7c"
					}}
				>
					<ListItemIcon
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
						sx={{ opacity: isDrawerOpen ? 1 : 0 }}
					/>
					{isDrawerOpen ? openChild ? <ExpandLess /> : <ExpandMore /> : null}
				</ListItemButton>
			</ListItem>
			<Collapse in={openChild} unmountOnExit timeout={"auto"}>
				<List component="div" disablePadding style={{ marginLeft: 20 }}>
					{
						item.componentChild?.map(child => (
							<ListItem
								key={child.componentKey}
								onClick={() => handleRoute(child.componentPath)}
								disablePadding
								style={
									pathname === child.componentPath ?
										{
											borderRadius: 25,
											backgroundColor: "#cdf6ff",
											color: "#ff0000"
										}
										: {
											backgroundColor: "#ffffff",
											color: "#7c7c7c"
										}
								}
							>
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: isDrawerOpen ? 'initial' : 'center',
										px: 2.5,
										":hover": {
											borderRadius: 25,
											backgroundColor: "#d9d8d8"
										}
									}}
								>
									<ListItemIcon
										style={pathname === child.componentPath ? {color: "#ff0000"} : {color: "#7c7c7c"}}
										sx={{
											minWidth: 0,
											mr: isDrawerOpen ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										{child.componentIcon}
									</ListItemIcon>
									<ListItemText
										primary={child.componentLabel}
										style={pathname === child.componentPath ? {color: "#ff0000"} : {color: "#7c7c7c"}}
										sx={{ opacity: isDrawerOpen ? 1 : 0 }}
									/>
								</ListItemButton>
							</ListItem>
						))
					}
				</List>
				<Divider/>
			</Collapse>
		</Box>
	)
}

const DrawerMenu = ({ isDrawerOpen, handleOpenDrawer }: IMenuProps) => {

	const userToken = useAppSelector(selectToken);

	return (
		<List style={{ padding: 10 }}>
			{itemList.map((item) => (
				item.componentRole != null ?
					userToken.role !== "" && item.componentRole.includes(userToken.role) ?
						item.componentChild == null ?
							<DrawerMenuItem key={item.componentKey} item={item}
							                isDrawerOpen={isDrawerOpen}/>
							: <DrawerMenuItemWithChild key={item.componentKey} item={item}
							                           isDrawerOpen={isDrawerOpen}
							                           handleOpenDrawer={handleOpenDrawer}/>
						: null
					: <DrawerMenuItem key={item.componentKey} item={item} isDrawerOpen={isDrawerOpen}/>
			))}
		</List>
	)
}
export default DrawerMenu;
