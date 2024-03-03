import React from 'react';
import { Home } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApiIcon from '@mui/icons-material/Api';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export interface DrawerItem {
    componentKey: string;
    componentIcon: React.ReactElement;
    componentLabel: string;
    componentPath: string;
    componentRole: Array<string> | null;
    componentChild: Array<DrawerItem> | null;
}

const DrawerItemList: Array<DrawerItem> = [
    {
        componentKey: '1',
        componentIcon: <Home />,
        componentLabel: 'Home',
        componentPath: '/',
        componentRole: null,
        componentChild: null,
    },
    {
        componentKey: '2',
        componentIcon: <AdminPanelSettingsIcon />,
        componentLabel: 'Admin Panel',
        componentPath: '/dashboard',
        componentRole: ['ROLE_ADMIN', 'ROLE_EMP'],
        componentChild: [
            {
                componentKey: '2.1',
                componentIcon: <DashboardIcon />,
                componentLabel: 'Dash Board',
                componentPath: '/dashboard',
                componentRole: ['ROLE_ADMIN', 'ROLE_EMP'],
                componentChild: null,
            },
            {
                componentKey: '2.2',
                componentIcon: <ApiIcon />,
                componentLabel: 'App API',
                componentPath: '/dashboard/api',
                componentRole: ['ROLE_ADMIN', 'ROLE_EMP'],
                componentChild: null,
            },
            {
                componentKey: '2.3',
                componentIcon: <BarChartIcon />,
                componentLabel: 'Chart',
                componentPath: '/dashboard/chart',
                componentRole: ['ROLE_ADMIN', 'ROLE_EMP'],
                componentChild: null,
            },
            {
                componentKey: '2.4',
                componentIcon: <ChangeCircleIcon />,
                componentLabel: 'Log Change',
                componentPath: '/dashboard/log',
                componentRole: ['ROLE_ADMIN', 'ROLE_EMP'],
                componentChild: [
                    {
                        componentKey: '2.4.1',
                        componentIcon: <ChangeCircleIcon />,
                        componentLabel: 'Log Change test',
                        componentPath: '/dashboard/logtest',
                        componentRole: ['ROLE_ADMIN', 'ROLE_EMP'],
                        componentChild: null,
                    },
                ],
            },
        ],
    },
    {
        componentKey: '3',
        componentIcon: <FavoriteIcon />,
        componentLabel: 'Favorite',
        componentPath: '/favorite',
        componentRole: null,
        componentChild: null,
    },
];
export default DrawerItemList;
