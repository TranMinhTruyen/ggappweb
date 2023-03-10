import {Tab} from "@mui/material";
import * as React from "react";

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

interface TabItemProps {
    icon?: React.ReactElement;
    index: number;
    isDrawerOpen: boolean
    labelName?: string;
}

const TabItem = (props: TabItemProps) => {
    const { icon, index, isDrawerOpen, labelName, ...other } = props;
    return (
        <Tab sx={{minHeight: 48, justifyContent: isDrawerOpen ? 'initial' : 'center', px: 2.5}}
             icon={icon}
             iconPosition="start"
             label={ isDrawerOpen ? labelName : ""}
             {...a11yProps(index)}
             {...other}
        />
    )
}
export default TabItem;
