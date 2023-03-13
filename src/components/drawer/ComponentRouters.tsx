import React from "react";
import {Home} from "@mui/icons-material";
import HomeComponent from "../../screens/HomeComponent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DashboardIcon from '@mui/icons-material/Dashboard';
import Farvorite from "../../screens/Farvorite";
import DashBoardComponent from "../../screens/dashboard/DashBoardComponent";

export interface ComponentTabItem {
    componentKey: number;
    componentIcon: React.ReactElement;
    componentNode: React.ReactNode;
    componentLabel: string;
    componentPath: string;
    componentRole: Array<string> | null;
}

const ComponentRouters: Array<ComponentTabItem> = [
    {
        componentKey: 0,
        componentIcon: <Home />,
        componentNode: <HomeComponent/>,
        componentLabel: "Home",
        componentPath: "/",
        componentRole: null
    },
    {
        componentKey: 1,
        componentIcon: <DashboardIcon />,
        componentNode: <DashBoardComponent/>,
        componentLabel: "DashBoard",
        componentPath: "/dashboard",
        componentRole: ["ROLE_ADMIN", "ROLE_EMP"]
    },
    {
        componentKey: 2,
        componentIcon: <FavoriteIcon />,
        componentNode: <Farvorite/>,
        componentLabel: "Favorite",
        componentPath: "/favorite",
        componentRole: null
    },
];

export default ComponentRouters;
