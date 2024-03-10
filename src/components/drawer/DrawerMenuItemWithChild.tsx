import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import { useAppSelector } from 'app/store';
import { selectOpenDrawer } from 'services/main/mainSlice';
import {
    CustomListItem,
    CustomListItemButton,
    CustomListItemIcon,
    IDrawerMenuItemProps,
} from 'components/drawer/DrawerMenu';
import DrawerMenuItem from 'components/drawer/DrawerMenuItem';
import { memo, useState } from 'react';

const DrawerMenuItemWithChild = ({ item }: IDrawerMenuItemProps) => {
    const [openChild, setOpenChild] = useState<boolean>(false);
    const openDrawer = useAppSelector(selectOpenDrawer);

    const handleExpand = () => {
        setOpenChild(!openChild);
    };

    const childItem = item.componentChild?.map(child =>
        child.componentChild == null ? (
            <DrawerMenuItem
                key={child.componentKey}
                isChild={true}
                item={child}
                childIndex={item.componentChild?.indexOf(child)}
            />
        ) : (
            <DrawerMenuItemWithChild key={child.componentKey} item={child} />
        )
    );

    const expandButton = openDrawer ? (
        openChild ? (
            <ExpandLess sx={{ color: '#7c7c7c' }} />
        ) : (
            <ExpandMore sx={{ color: '#7c7c7c' }} />
        )
    ) : (
        <></>
    );

    return (
        <Box>
            <CustomListItem onClick={handleExpand} disablePadding>
                <CustomListItemButton sx={{ justifyContent: openDrawer ? 'initial' : 'center' }}>
                    <CustomListItemIcon sx={{ mr: openDrawer ? 3 : 'auto' }}>
                        {item.componentIcon}
                    </CustomListItemIcon>
                    <ListItemText
                        primary={item.componentLabel}
                        sx={{
                            opacity: openDrawer ? 1 : 0,
                            color: '#7c7c7c',
                        }}
                    />
                    {expandButton}
                </CustomListItemButton>
            </CustomListItem>
            <Collapse in={openChild} unmountOnExit>
                <Divider style={{ marginTop: 8 }} />
                <List
                    component="div"
                    style={{
                        marginLeft: openDrawer ? 20 : 0,
                        paddingTop: 5,
                        paddingBottom: 5,
                    }}
                >
                    {childItem}
                </List>
                <Divider />
            </Collapse>
        </Box>
    );
};

export default memo(DrawerMenuItemWithChild);
