import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {LoginRequest} from "../../common/dto/request/LoginRequest";
import {setToken} from "../../redux/slices/tokenSlice";
import LoginApi from "../../common/api/LoginApi";
import Box from "@mui/material/Box";
import CommonModal from "../../components/CommonModal";
import Grid2 from "@mui/material/Unstable_Grid2";
import CommonButton from "../../components/CommonButton";
import CommonTextInput from "../../components/CommonTextInput";
import {Avatar, Checkbox, FormControlLabel, Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import CommonAlert, {IAlertDetail} from "../../components/CommonAlert";
import {setIsLogin, setOpenLoginModal, setOpenRegisterModal} from "../../redux/slices/commonSlice";
import {RootState} from "../../redux/store";
import {shallowEqual} from "react-redux";

const alertDetail: IAlertDetail = {
	alertSeverity: "error",
	title: "",
	showAlert: false,
	message: ""
}

type LoginModalActionProps = {
	username: string;
	password: string;
	remember: boolean;
	showAlert?: (showAlert: boolean) => void;
	onSummit: () => void;
}

type LoginModalContentProps = {
	open: boolean;
	usernameValidCheck: boolean
	passwordValidCheck: boolean
	alert?: IAlertDetail;
	setUsername: (username: string) => void;
	setPassword: (password: string) => void;
	setRememberChecked: (checked: boolean) => void;
}

const LoginModalAction = (props: LoginModalActionProps) => {

	const { onSummit } = props;
	const dispatch = useAppDispatch();

	return (
		<Grid2 container columnSpacing={2}>
			<Grid2>
				<CommonButton variant="contained" onClick={() => dispatch(setOpenLoginModal(false))} label={"Cancel"} />
			</Grid2>
			<Grid2>
				<CommonButton variant="contained" onClick={() => onSummit()} label={"Login"} />
			</Grid2>
		</Grid2>
	)
}

const LoginModalContent = (props: LoginModalContentProps) => {

	const {
		open,
		usernameValidCheck,
		passwordValidCheck,
		alert = {showAlert: false, message: "", title: "", alertSeverity: "error"},
		setUsername,
		setPassword,
		setRememberChecked
	} = props;
	
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		setShowPassword(false);
	}, [open])

	return (
		<Grid2 container spacing={2}>
			<Grid2 xs={12} sx={{ marginBottom: 2 }}>
				<CommonAlert variant={"filled"} alert={alert}/>
			</Grid2>
			<Grid2 container justifyContent="center" xs={12}>
				<Avatar sx={{ width: 150, height: 150 }} />
			</Grid2>
			<Grid2 container justifyContent="center" xs={12}>
				<Typography fontSize={50} fontWeight={'bold'}>Login</Typography>
			</Grid2>
			<Grid2 xs={12}>
				<CommonTextInput
					isValid={usernameValidCheck}
					isRequire={true}
					placeholder={"Username or email"}
					helpText={"This is require!"}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<AccountCircle />
							</InputAdornment>
						),
					}}
					onChange={(value) => {
						setUsername(value);
					}}
				/>
			</Grid2>
			<Grid2 xs={12}>
				<CommonTextInput
					isValid={passwordValidCheck}
					isRequire={true}
					placeholder="Password"
					helpText={"This is require!"}
					type={showPassword ? 'text' : 'password'}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<KeyIcon />
							</InputAdornment>
						),
						endAdornment : (
							<InputAdornment position="end" style={{ marginRight: 5 }}>
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									edge="end"
								>
									{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon/>}
								</IconButton>
							</InputAdornment>
						)
					}}
					onChange={(value) => {
						setPassword(value);
					}}
				/>
			</Grid2>
			<Grid2 container justifyContent="end" xs={12}>
				<FormControlLabel control={
					<Checkbox onChange={
						(event: React.ChangeEvent<HTMLInputElement>) => setRememberChecked(event.target.checked)}
					/>} label="Remember me" />
			</Grid2>
			<Grid2 container justifyContent="center" xs={12}>
				<Typography>If you don't have account:
					<Link onClick={() => {
						dispatch(setOpenRegisterModal(true))
						dispatch(setOpenLoginModal(false))
					}}>Register</Link>
				</Typography>
			</Grid2>
		
		</Grid2>
	)
}

const LoginModal = () => {
	
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [rememberChecked, setRememberChecked] = useState<boolean>(false);
	const [usernameValidCheck, setUsernameValidCheck] = useState<boolean>(true);
	const [passwordValidCheck, setPasswordValidCheck] = useState<boolean>(true);
	const [alert, setAlert] = useState<IAlertDetail>(alertDetail);

	const { openLoginModal } = useAppSelector(
		(state: RootState) => ({ openLoginModal: state.commonState.openLoginModal }),
		shallowEqual
	);
	
	useEffect(() => {
		setUsernameValidCheck(true);
		setPasswordValidCheck(true);
		setRememberChecked(false);
		setUsername("");
		setPassword("");
		setAlert({...alertDetail, showAlert: false, message: "", title: "", alertSeverity: "error"});
	}, [openLoginModal])
	
	const dispatch = useAppDispatch();
	
	const loginHandle = async () => {
		
		if (username === null || username === "") {
			setUsernameValidCheck(false);
			setAlert({...alertDetail, showAlert: true, message: "Please input username!", title: "Warning", alertSeverity: "warning"})
		}
		if (password === null || password === "") {
			setPasswordValidCheck(false);
			setAlert({...alertDetail, showAlert: true, message: "Please input password!", title: "Warning", alertSeverity: "warning"})
		}
		if ((username === null || username === "") && (password === null || password === "")) {
			setUsernameValidCheck(false);
			setPasswordValidCheck(false);
			setAlert({...alertDetail, showAlert: true, message: "Please input username and password!", title: "Warning", alertSeverity: "warning"})
		}
		if (username !== "" && username !== null && password !== "" && password !== null) {
			setUsernameValidCheck(true);
			setPasswordValidCheck(true);
			
			let request: LoginRequest = {
				account: username,
				password: password,
				deviceInfo: {
					deviceOperationSystem: "string",
					deviceName: "string",
					deviceMac: "string",
					deviceIp: "string"
				},
				remember: rememberChecked
			};
			
			const response = await LoginApi.login(request);
			
			if (response.status === 200) {
				dispatch(setOpenLoginModal(false));
				if (rememberChecked) {
					localStorage.setItem('tokenState', JSON.stringify(response.payload))
				} else {
					sessionStorage.setItem('tokenState', JSON.stringify(response.payload));
				}
				dispatch(setToken(response.payload));
				dispatch(setIsLogin(true));
			} else {
				setAlert({...alertDetail, showAlert: true, message: response.message, title: "Error", alertSeverity: "error"})
			}
		}
	}

	return (
		<Box>
			<CommonModal
				open={openLoginModal}
				onClose={() => dispatch(setOpenLoginModal(false))}
				size={'sm'}
				dialogContent={
					<LoginModalContent
						usernameValidCheck={usernameValidCheck}
						passwordValidCheck={passwordValidCheck}
						alert={alert}
						open={openLoginModal}
						setUsername={(value) => setUsername(value)}
						setPassword={(value) => setPassword(value)}
						setRememberChecked={(value) => setRememberChecked(value)}
					/>}
				dialogAction={
					<LoginModalAction
						username={username}
						password={password}
						remember={rememberChecked}
						onSummit={() => loginHandle()}
					/>
				}
			/>
		</Box>
	)
}

export default React.memo(LoginModal);
