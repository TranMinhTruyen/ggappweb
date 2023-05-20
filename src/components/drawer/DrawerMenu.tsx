import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectToken } from '../../redux/slices/tokenSlice';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import DrawerItemList, { DrawerItem } from './DrawerItems';
import { selectCommon } from '../../redux/slices/commonSlice';
import { styled } from '@mui/material/styles';
import Grid2 from '@mui/material/Unstable_Grid2';
import { RootState } from '../../redux/store';
import { shallowEqual } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const itemList = DrawerItemList;

type IMenuItemProps = {
	item: DrawerItem;
}

const CustomListItem = styled(ListItem)({
	borderRadius: 25,
	display: 'block'
});

const CustomListItemButton = styled(ListItemButton)({
	minHeight: 50,
	minWidth: 0,
	px: 2.5,
	justifyContent: 'center',
	borderRadius: 25,
	'&:hover': {
		backgroundColor: '#d9d8d8'
	},
	'&:active': {
		boxShadow: '#a8a8a8',
		color: '#000000',
	},
});

const CustomListItemIcon = styled(ListItemIcon)({
	minWidth: 0,
	justifyContent: 'center',
	color: '#7c7c7c'
});

const DrawerMenuItem = ({ item }: IMenuItemProps) => {
	
	const navigate = useNavigate();
	const location = useLocation();
	const { pathname } = location;
	const handleRoute = (path: string) => navigate(path);
	const commonState = useAppSelector(selectCommon);
	
	return (
		<Box>
			<CustomListItem
				style={
					pathname === item.componentPath ?
						{
							backgroundColor: 'rgba(210,210,210,0.8)',
							color: '#ff0000'
						}
						: {
							backgroundColor: '#ffffff',
							color: '#7c7c7c'
						}
				}
				onClick={() => handleRoute(item.componentPath)}
				disablePadding
			>
				<CustomListItemButton
					sx={{ justifyContent: commonState.openDrawer ? 'initial' : 'center' }}
				>
					<CustomListItemIcon
						style={pathname === item.componentPath ? { color: '#ff0000' } : { color: '#7c7c7c' }}
						sx={{
							mr: commonState.openDrawer ? 3 : 'auto',
						}}
					>
						{item.componentIcon}
					</CustomListItemIcon>
					<ListItemText
						primary={item.componentLabel}
						style={pathname === item.componentPath ? { color: '#ff0000' } : { color: '#7c7c7c' }}
						sx={{ opacity: commonState.openDrawer ? 1 : 0 }}
					/>
				</CustomListItemButton>
			</CustomListItem>
		</Box>
	);
};

const DrawerMenuItemWithChild = ({ item }: IMenuItemProps) => {
	
	const navigate = useNavigate();
	const location = useLocation();
	const [openChild, setOpenChild] = useState<boolean>(false);
	const { pathname } = location;
	const { openDrawer } = useAppSelector(
		(state: RootState) => ({ openDrawer: state.commonState.openDrawer }),
		shallowEqual
	);
	
	const handleRoute = (path: string) => {
		navigate(path);
	};
	
	const handleExpand = () => {
		setOpenChild(!openChild);
	};
	
	return (
		<Box>
			<CustomListItem
				onClick={handleExpand}
				disablePadding
			>
				<CustomListItemButton sx={{ justifyContent: openDrawer ? 'initial' : 'center', }}>
					<CustomListItemIcon sx={{ mr: openDrawer ? 3 : 'auto' }}>
						{item.componentIcon}
					</CustomListItemIcon>
					<ListItemText
						primary={item.componentLabel}
						sx={{
							opacity: openDrawer ? 1 : 0,
							color: '#7c7c7c'
						}}
					/>
					{openDrawer ? openChild ?
							<ExpandLess sx={{ color: '#7c7c7c' }}/>
							:
							<ExpandMore sx={{ color: '#7c7c7c' }}/>
						:
						null
					}
				</CustomListItemButton>
			</CustomListItem>
			<Collapse in={openChild} unmountOnExit>
				{!openDrawer ? <Divider style={{ marginTop: 8 }}/> : null}
				<List
					component="div"
					style={{
						marginLeft: openDrawer ? 20 : 0,
						paddingTop: 5,
						paddingBottom: 5,
					}}
				>
					{
						item.componentChild?.map(child => (
							child.componentChild == null ?
								<CustomListItem
									key={child.componentKey}
									onClick={() => handleRoute(child.componentPath)}
									disablePadding
									style={{
										marginTop: item.componentChild?.indexOf(child) !== 0 ? 8 : 0,
										backgroundColor: pathname === child.componentPath ? 'rgba(210,210,210,0.8)' : '#ffffff',
										color: pathname === child.componentPath ? '#ff0000' : '#7c7c7c'
									}}
								>
									<CustomListItemButton
										sx={{ justifyContent: openDrawer ? 'initial' : 'center' }}
									>
										<CustomListItemIcon
											style={pathname === child.componentPath ? { color: '#ff0000' } : { color: '#7c7c7c' }}
											sx={{ mr: openDrawer ? 3 : 'auto', }}
										>
											{child.componentIcon}
										</CustomListItemIcon>
										<ListItemText
											primary={child.componentLabel}
											style={pathname === child.componentPath ? { color: '#ff0000' } : { color: '#7c7c7c' }}
											sx={{ opacity: openDrawer ? 1 : 0 }}
										/>
									</CustomListItemButton>
								</CustomListItem> :
								<DrawerMenuItemWithChild key={child.componentKey} item={child}/>
						))
					}
				</List>
				<Divider/>
			</Collapse>
		</Box>
	);
};

const DrawerMenu = () => {
	
	const userToken = useAppSelector(selectToken);
	
	return (
		<Grid2 container sx={{ padding: 1 }} spacing={1}>
			{itemList.map((item) => (
				item.componentRole != null ?
					userToken.role !== '' && item.componentRole.includes(userToken.role) ?
						item.componentChild == null ?
							<Grid2 key={item.componentKey} xs={12}>
								<DrawerMenuItem item={item}/>
							</Grid2>
							:
							<Grid2 key={item.componentKey} xs={12}>
								<DrawerMenuItemWithChild item={item}/>
							</Grid2>
						: null
					:
					<Grid2 key={item.componentKey} xs={12}>
						<DrawerMenuItem item={item}/>
					</Grid2>
			))}
		</Grid2>
	);
};
export default React.memo(DrawerMenu);
