import React, { lazy } from 'react';

const HomeComponent = lazy(() => import('pages/home/HomeScreen'));
const DashBoardComponent = lazy(() => import('pages/DashBoardScreen'));
const FavoriteComponent = lazy(() => import('pages/FavoriteScreen'));
const ApiComponent = lazy(() => import('pages/ApiScreen'));
const ChartComponent = lazy(() => import('pages/ChartScreen'));
const LogChangeComponent = lazy(() => import('pages/LogChangeScreen'));
const NotFoundComponent = lazy(() => import('pages/NotFoundScreen'));

export interface ComponentTabItem {
    componentNode: React.ReactNode;
    componentPath: string;
}

const ComponentRouters: Array<ComponentTabItem> = [
    {
        componentNode: <HomeComponent />,
        componentPath: '/',
    },
    {
        componentNode: <DashBoardComponent />,
        componentPath: '/dashboard',
    },
    {
        componentNode: <ApiComponent />,
        componentPath: '/dashboard/api',
    },
    {
        componentNode: <ChartComponent />,
        componentPath: '/dashboard/chart',
    },
    {
        componentNode: <LogChangeComponent />,
        componentPath: '/dashboard/log',
    },
    {
        componentNode: <FavoriteComponent />,
        componentPath: '/favorite',
    },
    {
        componentNode: <NotFoundComponent />,
        componentPath: '*',
    },
];

export default ComponentRouters;
