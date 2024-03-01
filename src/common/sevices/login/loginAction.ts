import store from 'app/store';
import { LoginRequest } from 'common/dto/request/LoginRequest';
import { AuthState, setAuth } from 'common/sevices/auth/authSlice';
import LoginService from 'common/sevices/login/loginService';
import { setLoginAlert, toggleLoginDialog } from 'common/sevices/login/loginSlice';
import { ILoginForm } from 'components/main/login/LoginModal';
import _ from 'lodash';
import { UseFormGetValues } from 'react-hook-form';
import { NavigateFunction } from 'react-router/dist/lib/hooks';

export const loginAction = async (getValues: UseFormGetValues<ILoginForm>, navigate: NavigateFunction) => {
    const accountInput: string = getValues().account;
    const passwordInput: string = getValues().password;
    const rememberChecked: boolean = getValues().remember;
    if (_.isEmpty(accountInput) && _.isEmpty(passwordInput)) {
        store.dispatch(
            setLoginAlert({
                showAlert: true,
                message: 'Please input username (or email) and password!',
                title: 'Warning',
                alertSeverity: 'warning',
            })
        );
        return;
    }

    if (_.isEmpty(accountInput)) {
        store.dispatch(
            setLoginAlert({
                showAlert: true,
                message: 'Please input username or email!',
                title: 'Warning',
                alertSeverity: 'warning',
            })
        );
        return;
    }

    if (_.isEmpty(passwordInput)) {
        store.dispatch(
            setLoginAlert({
                showAlert: true,
                message: 'Please input password!',
                title: 'Warning',
                alertSeverity: 'warning',
            })
        );
        return;
    }

    const request: LoginRequest = {
        account: accountInput,
        password: passwordInput,
        deviceInfo: {
            deviceOperationSystem: 'string',
            deviceName: 'string',
            deviceMac: 'string',
            deviceIp: 'string',
        },
        remember: rememberChecked,
    };

    (window as any).electron.request('login', request);

    const response = await LoginService.login(request);
    if (response.status === 200) {
        const auth: AuthState = {
            ...response.payload,
            isRemember: rememberChecked,
        };
        store.dispatch(setAuth(auth));
        store.dispatch(toggleLoginDialog());
        navigate('/');
    } else {
        store.dispatch(
            setLoginAlert({
                showAlert: true,
                message: response.message,
                title: 'Error',
                alertSeverity: 'error',
            })
        );
        return;
    }
};
