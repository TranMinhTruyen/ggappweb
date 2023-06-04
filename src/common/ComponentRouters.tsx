import React, { lazy } from 'react';

const HomeComponent = lazy(() => import('../screens/home/HomeScreen'));
const DashBoardComponent = lazy(() => import('../screens/DashBoardScreen'));
const FavoriteComponent = lazy(() => import('../screens/FavoriteScreen'));
const ApiComponent = lazy(() => import('../screens/ApiScreen'));
const ChartComponent = lazy(() => import('../screens/ChartScreen'));
const LogChangeComponent = lazy(() => import('../screens/LogChangeScreen'));
const NotFoundComponent = lazy(() => import ('../screens/NotFoundScreen'));

export interface ComponentTabItem {
	componentNode: React.ReactNode;
	componentPath: string;
}

const ComponentRouters: Array<ComponentTabItem> = [
	{
		componentNode: <HomeComponent/>,
		componentPath: '/'
	},
	{
		componentNode: <DashBoardComponent/>,
		componentPath: '/dashboard'
	},
	{
		componentNode: <ApiComponent/>,
		componentPath: '/dashboard/api'
	},
	{
		componentNode: <ChartComponent/>,
		componentPath: '/dashboard/chart'
	},
	{
		componentNode: <LogChangeComponent/>,
		componentPath: '/dashboard/log'
	},
	{
		componentNode: <FavoriteComponent/>,
		componentPath: '/favorite',
	},
	{
		componentNode: <NotFoundComponent/>,
		componentPath: '*',
	},
];

export default ComponentRouters;
