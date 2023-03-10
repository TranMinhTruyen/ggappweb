import {Tabs} from "@mui/material";
import {Home} from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import * as React from "react";
import {SyntheticEvent} from "react";
import TabItem from "./TabItem";
import ListComponentTabItem from "./ListComponentTabItem";

interface ListTabProps {
    value: number;
    isDrawerOpen: boolean
    onChange: (event: SyntheticEvent, newValue: number) => void
}

const itemList = ListComponentTabItem;

const ListTab = (props: ListTabProps) => {
    const { value, onChange, isDrawerOpen, ...other } = props;
    return (
        <Tabs orientation="vertical" variant="scrollable" value={value} onChange={onChange} {...other}>
            {itemList.map(item => (
                <TabItem index={item.componentIndex} icon={item.componentIcon} isDrawerOpen = {isDrawerOpen} labelName={item.componentLabel}/>
            ))}
        </Tabs>
    )
}

export default ListTab;
