import { ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useAppSelector } from 'app/store';
import { selectRole } from 'common/sevices/auth/authSlice';
import DrawerItemList, { DrawerItem } from 'components/drawer/DrawerListItem';
import DrawerMenuItem from 'components/drawer/DrawerMenuItem';
import DrawerMenuItemWithChild from 'components/drawer/DrawerMenuItemWithChild';
import { memo, useCallback } from 'react';

const itemList = DrawerItemList;

export interface IDrawerMenuItemProps {
  isChild?: boolean;
  childIndex?: number;
  item: DrawerItem;
}

const DrawerMenu = () => {
  const role = useAppSelector(selectRole);

  const showDrawerByRole = useCallback(
    (item: DrawerItem) => {
      if (item.componentRole === null) {
        return undefined;
      }
      if (item.componentRole.includes(role)) {
        return undefined;
      } else {
        return 'none';
      }
    },
    [role]
  );

  return (
    <Grid2 key={'drawer-menu'} container sx={{ padding: 1 }} spacing={1}>
      {itemList.map(item =>
        item.componentChild == null ? (
          <Grid2 key={item.componentKey} xs={12} display={showDrawerByRole(item)}>
            <DrawerMenuItem item={item} />
          </Grid2>
        ) : (
          <Grid2 key={item.componentKey} xs={12} display={showDrawerByRole(item)}>
            <DrawerMenuItemWithChild item={item} />
          </Grid2>
        )
      )}
    </Grid2>
  );
};

export const CustomListItem = styled(ListItem)({
  borderRadius: 25,
  display: 'block',
});

export const CustomListItemButton = styled(ListItemButton)({
  minHeight: 50,
  minWidth: 0,
  px: 2.5,
  justifyContent: 'center',
  borderRadius: 25,
  '&:hover': {
    backgroundColor: '#d9d8d8',
  },
  '&:active': {
    boxShadow: '#a8a8a8',
    color: '#000000',
  },
});

export const CustomListItemIcon = styled(ListItemIcon)({
  minWidth: 0,
  justifyContent: 'center',
  color: '#7c7c7c',
});

export default memo(DrawerMenu);
