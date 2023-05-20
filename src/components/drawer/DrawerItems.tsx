import React from 'react';
import { Home } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApiIcon from '@mui/icons-material/Api';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export type DrawerItem = {
	componentKey: number;
	componentIcon: React.ReactElement;
	componentLabel: string;
	componentPath: string;
	componentRole: Array<string> | null;
	componentChild: Array<DrawerItem> | null;
}

const DrawerItemList: Array<DrawerItem> = [
	{
		componentKey: 0,
		componentIcon: <Home/>,
		componentLabel: 'Home',
		componentPath: '/',
		componentRole: null,
		componentChild: null,
	},
	{
		componentKey: 1,
		componentIcon: <AdminPanelSettingsIcon/>,
		componentLabel: 'Admin Panel',
		componentPath: '/dashboard',
		componentRole: ['ROLE_ADMIN', 'ROLE_EMP'],
		componentChild: [
			{
				componentKey: 1.0,
				componentIcon: <DashboardIcon/>,
				componentLabel: 'Dash Board',
				componentPath: '/dashboard',
				componentRole: ['ROLE_ADMIN', 'ROLE_EMP'],
				componentChild: null
			},
			{
				componentKey: 1.1,
				componentIcon: <ApiIcon/>,
				componentLabel: 'App API',
				componentPath: '/dashboard/api',
				componentRole: ['ROLE_ADMIN', 'ROLE_EMP'],
				componentChild: null
			},
			{
				componentKey: 1.2,
				componentIcon: <BarChartIcon/>,
				componentLabel: 'Chart',
				componentPath: '/dashboard/chart',
				componentRole: ['ROLE_ADMIN', 'ROLE_EMP'],
				componentChild: null
			},
			{
				componentKey: 1.3,
				componentIcon: <ChangeCircleIcon/>,
				componentLabel: 'Log Change',
				componentPath: '/dashboard/log',
				componentRole: ['ROLE_ADMIN', 'ROLE_EMP'],
				componentChild: null
			},
		]
	},
	{
		componentKey: 2,
		componentIcon: <FavoriteIcon/>,
		componentLabel: 'Favorite',
		componentPath: '/favorite',
		componentRole: null,
		componentChild: null
	},
];
export default DrawerItemList;