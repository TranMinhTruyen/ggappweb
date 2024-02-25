import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MuiAppBar from '@mui/material/AppBar';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar/AppBar';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';
import {
  clearAuth,
  selectAccessToken,
  selectIsLogin,
  selectRole,
} from 'common/sevices/auth/authSlice';
import CartService from 'common/sevices/cart/cartService';
import {
  resetAmountInCart,
  selectAmountInCart,
  setAmountInCart,
} from 'common/sevices/cart/cartSlice';
import { toggleLoginDialog } from 'common/sevices/login/loginSlice';
import Button from 'components/Button';
import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectOpenDrawer, toggleDrawer } from 'common/sevices/main/mainSlice';
import { useAppDispatch, useAppSelector } from 'app/store';
import CartIconButton from 'components/IconButton';
import StoreSelect from './select/StoreSelect';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

interface IHeaderProps {
  drawerWidth: number;
}

interface AppBarProps extends MuiAppBarProps {
  drawerWidth?: number;
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open' && prop !== 'drawerWidth',
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = (props: IHeaderProps) => {
  const { drawerWidth } = props;
  const isLogin = useAppSelector(selectIsLogin);
  const role = useAppSelector(selectRole);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const openDrawer = useAppSelector(selectOpenDrawer);
  const amountInCart = useAppSelector(selectAmountInCart);
  const accessToken = useAppSelector(selectAccessToken);
  const theme = useTheme();

  const handleDrawerOpen = useCallback(() => {
    dispatch(toggleDrawer());
  }, [dispatch]);

  const handleOpenLoginModal = useCallback(() => {
    dispatch(toggleLoginDialog());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(clearAuth());
    dispatch(resetAmountInCart());
    navigate('/');
  };

  const fetchCartAmount = useCallback(
    async (token: string) => {
      const response = await CartService.getCartById(token);
      if (response.status === 200) {
        dispatch(setAmountInCart(response.payload.amountInCart));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (isLogin && accessToken !== null && role === 'ROLE_USER') {
      fetchCartAmount(accessToken).then();
    }
  }, [isLogin, accessToken, role, fetchCartAmount]);

  const cartButton = isLogin && (
    <Grid2>
      <CartIconButton
        backgroundColor={'#ffffff'}
        badgeContent={amountInCart}
        icon={<ShoppingCartIcon />}
        variant="contained"
      />
    </Grid2>
  );

  const accountButton = (
    <Grid2>
      <Button
        width={130}
        height={35}
        backgroundColor={'#ffffff'}
        labelColor={'#000000'}
        startIcon={!isLogin ? <LoginIcon /> : <LogoutIcon />}
        variant="contained"
        onClick={!isLogin ? handleOpenLoginModal : handleLogout}
        label={!isLogin ? 'Login' : 'Logout'}
      />
    </Grid2>
  );

  return (
    <AppBar
      drawerWidth={drawerWidth}
      position="fixed"
      open={openDrawer}
      style={
        role === 'ROLE_ADMIN' || role === 'ROLE_EMP'
          ? { backgroundColor: '#05be00' }
          : { backgroundColor: '#ff0000' }
      }
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            width: `calc(${theme.spacing(5)} + 6px)`,
            marginRight: 5,
            ...(openDrawer && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <>
          <Typography
            variant="h6"
            noWrap
            component="span"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate('/')}
          >
            Gaming gear website
          </Typography>
        </>
        <Grid2 container spacing={2}>
          <Grid2>
            <StoreSelect />
          </Grid2>
          {cartButton}
          {accountButton}
        </Grid2>
      </Toolbar>
    </AppBar>
  );
};
export default memo(Header);
