import React from "react";

const HomeComponent = React.lazy(() => import("../screens/HomeScreen"));
const DashBoardComponent = React.lazy(() => import("../screens/DashBoardScreen"));
const FavoriteComponent = React.lazy(() => import("../screens/FavoriteScreen"));
const ApiComponent = React.lazy(() => import("../screens/ApiScreen"));
const ChartComponent = React.lazy(() => import("../screens/ChartScreen"));
const LogChangeComponent = React.lazy(() => import("../screens/LogChangeScreen"));

export interface ComponentTabItem {
    componentNode: React.ReactNode;
    componentPath: string;
}
const ComponentRouters: Array<ComponentTabItem> = [
    {
        componentNode: <HomeComponent/>,
        componentPath: "/"
    },
    {
        componentNode: <DashBoardComponent/>,
        componentPath: "/dashboard"
    },
    {
        componentNode: <ApiComponent/>,
        componentPath: "/dashboard/api"
    },
    {
        componentNode: <ChartComponent/>,
        componentPath: "/dashboard/chart"
    },
    {
        componentNode: <LogChangeComponent/>,
        componentPath: "/dashboard/log"
    },
    {
        componentNode: <FavoriteComponent/>,
        componentPath: "/favorite",
    },
];

export default ComponentRouters;
