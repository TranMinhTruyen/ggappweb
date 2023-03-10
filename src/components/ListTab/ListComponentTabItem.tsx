import React from "react";
import {Home} from "@mui/icons-material";
import HomeComponent from "../Home/HomeComponent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import PersonPinIcon from "@mui/icons-material/PersonPin";

interface ComponentTabItem {
    componentIndex: number;
    componentIcon: React.ReactElement;
    componentFile: React.ReactNode;
    componentLabel: string;
}

const home: ComponentTabItem = {
    componentIndex: 0,
    componentIcon: <Home />,
    componentFile: <HomeComponent></HomeComponent>,
    componentLabel: "Home",
}

const favorite: ComponentTabItem = {
    componentIndex: 1,
    componentIcon: <FavoriteIcon />,
    componentFile: <Typography component="span">Item 1</Typography>,
    componentLabel: "favorite",
}

const person: ComponentTabItem = {
    componentIndex: 2,
    componentIcon: <PersonPinIcon />,
    componentFile: <Typography component="span">Item 2</Typography>,
    componentLabel: "favorite",
}

const ListComponentTabItem: Array<ComponentTabItem> = [
    home,
    favorite,
    person
];

export default ListComponentTabItem;
