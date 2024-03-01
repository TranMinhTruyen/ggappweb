import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Avatar, Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useAppDispatch } from 'app/store';
import { toggleLoginDialog } from 'common/sevices/login/loginSlice';
import { toggleRegisterDialog } from 'common/sevices/register/registerSlice';
import Checkbox from 'components/Checkbox';
import TextInput from 'components/TextInput';
import React, { memo, useCallback, useState } from 'react';
import { Control } from 'react-hook-form';
import { ILoginForm } from './LoginModal';

interface LoginModalContentProps {
  control: Control<ILoginForm, object>;
}

const LoginModalContent = (props: LoginModalContentProps) => {
  const { control } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(pre => !pre);
  }, []);

  const handleOpenRegisterModal = useCallback(() => {
    dispatch(toggleRegisterDialog());
    dispatch(toggleLoginDialog());
  }, [dispatch]);

  return (
    <Grid2 container spacing={2}>
      <Grid2 container justifyContent="center" xs={12}>
        <Avatar sx={{ width: 150, height: 150 }} />
      </Grid2>
      <Grid2 container justifyContent="center" xs={12}>
        <Typography fontSize={50} fontWeight={'bold'}>
          Login
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <TextInput
          name={'account'}
          control={control}
          isRequire={true}
          placeholder={'Username or email'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </Grid2>
      <Grid2 xs={12}>
        <TextInput
          name={'password'}
          control={control}
          isRequire={true}
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" style={{ marginRight: 5 }}>
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid2>
      <Grid2 container justifyContent="end" xs={12}>
        <Checkbox name={'remember'} label={'Remember me'} control={control} />
      </Grid2>
      <Grid2 container justifyContent="center" xs={12}>
        <Typography>
          If you don't have account:
          <Link onClick={handleOpenRegisterModal}>Register</Link>
        </Typography>
      </Grid2>
    </Grid2>
  );
};

export default memo(LoginModalContent);
