import React from "react";
import HomeComponent from "../screens/HomeComponent";
import FavoriteComponent from "../screens/FavoriteComponent";
import DashBoardComponent from "../screens/DashBoardComponent";
import ChartComponent from "../screens/ChartComponent";
import ApiComponent from "../screens/ApiComponent";
import LogChangeComponent from "../screens/LogChangeComponent";

export interface ComponentTabItem {
    componentNode: React.ReactNode;
    componentPath: string;
    componentChild: Array<ComponentTabItem> | null;
}

const ComponentRouters: Array<ComponentTabItem> = [
    {
        componentNode: <HomeComponent/>,
        componentPath: "/",
        componentChild: null
    },
    {
        componentNode: <DashBoardComponent/>,
        componentPath: "/dashboard",
        componentChild: [
            {
                componentNode: <ApiComponent/>,
                componentPath: "/dashboard/api",
                componentChild: null
            },
            {
                componentNode: <ChartComponent/>,
                componentPath: "/dashboard/chart",
                componentChild: null
            },
            {
                componentNode: <LogChangeComponent/>,
                componentPath: "/dashboard/log",
                componentChild: null
            }
        ]
    },
    {
        componentNode: <FavoriteComponent/>,
        componentPath: "/favorite",
        componentChild: null
    },
];

export default ComponentRouters;
