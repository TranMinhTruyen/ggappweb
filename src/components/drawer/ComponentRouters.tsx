import React from "react";
import {Home} from "@mui/icons-material";
import HomeComponent from "../../screens/HomeComponent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApiIcon from '@mui/icons-material/Api';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import FavoriteComponent from "../../screens/FavoriteComponent";
import DashBoardComponent from "../../screens/DashBoardComponent";
import ChartComponent from "../../screens/ChartComponent";
import ApiComponent from "../../screens/ApiComponent";
import LogChangeComponent from "../../screens/LogChangeComponent";

export interface ComponentTabItem {
    componentKey: number;
    componentIcon: React.ReactElement;
    componentNode: React.ReactNode;
    componentLabel: string;
    componentPath: string;
    componentRole: Array<string> | null;
    componentChild: Array<ComponentTabItem> | null;
}

const ComponentRouters: Array<ComponentTabItem> = [
    {
        componentKey: 0,
        componentIcon: <Home />,
        componentNode: <HomeComponent/>,
        componentLabel: "Home",
        componentPath: "/",
        componentRole: null,
        componentChild: null
    },
    {
        componentKey: 1,
        componentIcon: <DashboardIcon />,
        componentNode: <DashBoardComponent/>,
        componentLabel: "DashBoard",
        componentPath: "/dashboard",
        componentRole: ["ROLE_ADMIN", "ROLE_EMP"],
        componentChild: [
            {
                componentKey: 1.1,
                componentIcon: <ApiIcon/>,
                componentNode: <ApiComponent/>,
                componentLabel: "App API",
                componentPath: "/dashboard/api",
                componentRole: ["ROLE_ADMIN", "ROLE_EMP"],
                componentChild: null
            },
            {
                componentKey: 1.2,
                componentIcon: <BarChartIcon/>,
                componentNode: <ChartComponent/>,
                componentLabel: "Chart",
                componentPath: "/dashboard/chart",
                componentRole: ["ROLE_ADMIN", "ROLE_EMP"],
                componentChild: null
            },
            {
                componentKey: 1.3,
                componentIcon: <ChangeCircleIcon/>,
                componentNode: <LogChangeComponent/>,
                componentLabel: "Change",
                componentPath: "/dashboard/log",
                componentRole: ["ROLE_ADMIN", "ROLE_EMP"],
                componentChild: null
            }
        ]
    },
    {
        componentKey: 2,
        componentIcon: <FavoriteIcon />,
        componentNode: <FavoriteComponent/>,
        componentLabel: "Favorite",
        componentPath: "/favorite",
        componentRole: null,
        componentChild: null
    },
];

export default ComponentRouters;
