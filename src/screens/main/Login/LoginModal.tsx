import React, { memo, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { LoginRequest } from '../../../common/dto/request/LoginRequest';
import { setToken } from '../../../redux/slices/tokenSlice';
import LoginService from '../../../common/sevices/login/loginService';
import Box from '@mui/material/Box';
import CommonModal from '../../../components/CommonModal';
import Grid2 from '@mui/material/Unstable_Grid2';
import CommonButton from '../../../components/CommonButton';
import CommonTextInput from '../../../components/CommonTextInput';
import { Avatar, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import CommonAlert, { IAlertDetail } from '../../../components/CommonAlert';
import { setIsLogin, setOpenLoginModal, setOpenRegisterModal } from '../../../redux/slices/commonSlice';
import { RootState } from '../../../redux/store';
import { shallowEqual } from 'react-redux';
import { Control, FieldValues, useForm, UseFormReset } from 'react-hook-form';
import CommonCheckbox from '../../../components/CommonCheckbox';

const alertDetail: IAlertDetail = {
	alertSeverity: 'error',
	title: '',
	showAlert: false,
	message: ''
};

interface LoginModalActionProps<T extends FieldValues> {
	showAlert?: (showAlert: boolean) => void;
	onSummit: () => void;
	reset: UseFormReset<T>;
}

interface LoginModalContentProps<T extends FieldValues> {
	control: Control<T, object>;
	alert?: IAlertDetail;
}

const LoginModalAction = (props: LoginModalActionProps<LoginRequest>) => {
	
	const { onSummit, reset } = props;
	const dispatch = useAppDispatch();
	
	const handleCancel = () => {
		dispatch(setOpenLoginModal(false));
		reset();
	}
	
	return (
		<Grid2 container columnSpacing={2}>
			<Grid2>
				<CommonButton variant="contained" onClick={handleCancel} label={'Cancel'}/>
			</Grid2>
			<Grid2>
				<CommonButton variant="contained" onClick={() => onSummit()} label={'Login'}/>
			</Grid2>
		</Grid2>
	);
};

const LoginModalContent = ({
	control,
	alert = { showAlert: false, message: '', title: '', alertSeverity: 'error' },
}: LoginModalContentProps<LoginRequest>) => {

	
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	
	const handleClickShowPassword = () => {
		setShowPassword((show) => !show)
	};
	
	const handleOpenRegisterModal = () => {
		dispatch(setOpenRegisterModal(true));
		dispatch(setOpenLoginModal(false));
	};
	
	return (
		<Grid2 container spacing={2} >
			<Grid2 xs={12} sx={{ marginBottom: 2 }}>
				<CommonAlert variant={'filled'} alert={alert}/>
			</Grid2>
			<Grid2 container justifyContent="center" xs={12}>
				<Avatar sx={{ width: 150, height: 150 }}/>
			</Grid2>
			<Grid2 container justifyContent="center" xs={12}>
				<Typography fontSize={50} fontWeight={'bold'}>Login</Typography>
			</Grid2>
			<Grid2 xs={12}>
				<CommonTextInput
					name={'account'}
					control={control}
					isRequire={true}
					placeholder={'Username or email'}
					helpText={'This is require!'}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<AccountCircle/>
							</InputAdornment>
						),
					}}
				/>
			</Grid2>
			<Grid2 xs={12}>
				<CommonTextInput
					name={'password'}
					control={control}
					isRequire={true}
					placeholder="Password"
					helpText={'This is require!'}
					type={showPassword ? 'text' : 'password'}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<KeyIcon/>
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end" style={{ marginRight: 5 }}>
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									edge="end"
								>
									{showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
								</IconButton>
							</InputAdornment>
						)
					}}
				/>
			</Grid2>
			<Grid2 container justifyContent="end" xs={12}>
				<CommonCheckbox
					name={'remember'}
					label={'Remember me'}
					control={control}
				/>
			</Grid2>
			<Grid2 container justifyContent="center" xs={12}>
				<Typography>If you don't have account:
					<Link onClick={handleOpenRegisterModal}>Register</Link>
				</Typography>
			</Grid2>
		</Grid2>
	);
};

const initValue: LoginRequest = {
	account: '',
	password: '',
	deviceInfo: {
		deviceOperationSystem: '',
		deviceName: '',
		deviceMac: '',
		deviceIp: ''
	},
	remember: false
}

const LoginModal = () => {
	const [alert, setAlert] = useState<IAlertDetail>(alertDetail);
	const { control, getValues, reset } = useForm<LoginRequest>({
		defaultValues: initValue
	});
	
	const { openLoginModal } = useAppSelector(
		(state: RootState) => ({ openLoginModal: state.commonState.openLoginModal }),
		shallowEqual
	);
	
	useEffect(() => {
		setAlert({ ...alertDetail, showAlert: false, message: '', title: '', alertSeverity: 'error' });
	}, [openLoginModal]);
	
	const dispatch = useAppDispatch();
	
	const loginHandle = async () => {
		const accountInput: string = getValues().account;
		const passwordInput: string = getValues().password;
		const rememberChecked: boolean = getValues().remember;
		
		if (accountInput === null || passwordInput === '') {
			setAlert({
				...alertDetail,
				showAlert: true,
				message: 'Please input username!',
				title: 'Warning',
				alertSeverity: 'warning'
			});
		}
		if (passwordInput === null || passwordInput === '') {
			setAlert({
				...alertDetail,
				showAlert: true,
				message: 'Please input password!',
				title: 'Warning',
				alertSeverity: 'warning'
			});
		}
		if ((accountInput === null || accountInput === '') && (passwordInput === null || passwordInput === '')) {
			setAlert({
				...alertDetail,
				showAlert: true,
				message: 'Please input username and password!',
				title: 'Warning',
				alertSeverity: 'warning'
			});
		}
		if (accountInput !== '' && accountInput !== null && passwordInput !== '' && passwordInput !== null) {
			let request: LoginRequest = {
				account: accountInput,
				password: passwordInput,
				deviceInfo: {
					deviceOperationSystem: 'string',
					deviceName: 'string',
					deviceMac: 'string',
					deviceIp: 'string'
				},
				remember: rememberChecked,
			};
			
			const response = await LoginService.login(request);
			if (response.status === 200) {
				dispatch(setOpenLoginModal(false));
				if (rememberChecked) {
					localStorage.setItem('tokenState', JSON.stringify(response.payload));
				} else {
					sessionStorage.setItem('tokenState', JSON.stringify(response.payload));
				}
				dispatch(setToken(response.payload));
				dispatch(setIsLogin(true));
			} else {
				setAlert({ ...alertDetail, showAlert: true, message: response.message, title: 'Error', alertSeverity: 'error' });
			}
		}
	};
	
	return (
		<Box>
			<CommonModal
				open={openLoginModal}
				onClose={() => {dispatch(setOpenLoginModal(false)); reset()}}
				size={'sm'}
				dialogContent={
					<LoginModalContent
						control={control}
						alert={alert}
					/>}
				dialogAction={
					<LoginModalAction
						onSummit={loginHandle}
						reset={reset}
					/>
				}
			/>
		</Box>
	);
};

export default memo(LoginModal);
