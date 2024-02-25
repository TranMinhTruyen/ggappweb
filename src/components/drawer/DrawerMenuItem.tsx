import { ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import { useAppSelector } from 'app/store';
import { selectOpenDrawer } from 'common/sevices/main/mainSlice';
import {
  CustomListItem,
  CustomListItemButton,
  CustomListItemIcon,
  IDrawerMenuItemProps,
} from 'components/drawer/DrawerMenu';
import { memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DrawerMenuItem = ({ item, isChild = false, childIndex }: IDrawerMenuItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const openDrawer = useAppSelector(selectOpenDrawer);

  const handleOnClickItem = useCallback(
    (path: string) => () => {
      navigate(path);
    },
    [navigate]
  );

  const customListItemStyle = {
    marginTop: isChild && childIndex !== 0 ? 8 : 0,
    backgroundColor: pathname === item.componentPath ? 'rgba(210,210,210,0.8)' : '#ffffff',
    color: pathname === item.componentPath ? '#ff0000' : '#7c7c7c',
  };

  const customListItemButtonStyle = { justifyContent: openDrawer ? 'initial' : 'center' };

  const customListItemIconSx = { mr: openDrawer ? 3 : 'auto' };

  const customListItemIconAndTextStyle =
    pathname === item.componentPath ? { color: '#ff0000' } : { color: '#7c7c7c' };

  const listItemTextSx = { opacity: openDrawer ? 1 : 0 };

  return (
    <Box>
      <CustomListItem
        style={customListItemStyle}
        onClick={handleOnClickItem(item.componentPath)}
        disablePadding
      >
        <CustomListItemButton sx={customListItemButtonStyle}>
          <CustomListItemIcon style={customListItemIconAndTextStyle} sx={customListItemIconSx}>
            {item.componentIcon}
          </CustomListItemIcon>
          <ListItemText
            primary={item.componentLabel}
            style={customListItemIconAndTextStyle}
            sx={listItemTextSx}
          />
        </CustomListItemButton>
      </CustomListItem>
    </Box>
  );
};

export default memo(DrawerMenuItem);
