import { useAppDispatch, useAppSelector } from 'app/store';
import { loginAction } from 'common/sevices/login/loginAction';
import {
  selectAlertLoginDialog,
  selectOpenLoginDialog,
  toggleLoginDialog,
} from 'common/sevices/login/loginSlice';
import Modal from 'components/Modal';
import { memo, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LoginModalFooter from './LoginModalFooter';
import LoginModalContent from './LoginModalContent';

export interface ILoginForm {
  account: string;
  password: string;
  remember: boolean;
}

const LoginModal = () => {
  const { control, getValues, reset, trigger } = useForm<ILoginForm>();
  const openLoginModal = useAppSelector(selectOpenLoginDialog);
  const alert = useAppSelector(selectAlertLoginDialog);
  const navigate = useNavigate();

  useEffect(() => {
    reset();
  }, [openLoginModal, reset]);

  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(toggleLoginDialog());
  }, [dispatch]);

  const handleLogin = useCallback(async () => {
    await trigger();
    await loginAction(getValues, navigate);
  }, [getValues, navigate, trigger]);

  return (
    <Modal
      open={openLoginModal}
      onClose={handleClose}
      alert={alert}
      size={'sm'}
      dialogContent={<LoginModalContent control={control} />}
      dialogFooter={<LoginModalFooter onClose={handleClose} onLogin={handleLogin} />}
    />
  );
};

export default memo(LoginModal);
