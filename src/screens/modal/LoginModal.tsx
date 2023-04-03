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
import {useAppDispatch} from "../../redux/hooks";
import CommonAlert, {IAlertDetail} from "../../components/CommonAlert";

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
	onClose: (isOpen: boolean) => void;
}

type LoginModalProps = {
	open: boolean;
	title: string;
	onClose: (value: boolean) => void;
	openRegister: (isOpen: boolean) => void;
}

type LoginModalContentProps = {
	open: boolean;
	usernameValidCheck: boolean
	passwordValidCheck: boolean
	alert?: IAlertDetail;
	setUsername: (username: string) => void;
	setPassword: (password: string) => void;
	openRegister: (isOpen: boolean) => void;
	setRememberChecked: (checked: boolean) => void;
}

const LoginModalAction = (props: LoginModalActionProps) => {

	const { onSummit, onClose } = props;

	return (
		<Box>
			<Grid2 container columnSpacing={2}>
				<Grid2>
					<CommonButton variant="contained" onClick={() => onClose(false)} label={"Cancel"} />
				</Grid2>
				<Grid2>
					<CommonButton variant="contained" onClick={() => onSummit()} label={"Login"} />
				</Grid2>
			</Grid2>
		</Box>
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
		openRegister,
		setRememberChecked
	} = props;
	
	const [showPassword, setShowPassword] = useState<boolean>(false);
	
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	
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
				<Typography>If you don't have account: <Link onClick={() => openRegister(true)}>Register</Link></Typography>
			</Grid2>
		
		</Grid2>
	)
}

const LoginModal = ({ open, onClose, openRegister }: LoginModalProps) => {
	
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [rememberChecked, setRememberChecked] = useState<boolean>(false);
	const [usernameValidCheck, setUsernameValidCheck] = useState<boolean>(true);
	const [passwordValidCheck, setPasswordValidCheck] = useState<boolean>(true);
	const [alert, setAlert] = useState<IAlertDetail>(alertDetail);
	
	useEffect(() => {
		setUsernameValidCheck(true);
		setPasswordValidCheck(true);
		setRememberChecked(false);
		setUsername("");
		setPassword("");
		setAlert({...alertDetail, showAlert: false, message: "", title: "", alertSeverity: "error"});
	}, [open, onClose])
	
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
				onClose(false)
				await dispatch(setToken(response.payload));
			} else {
				setAlert({...alertDetail, showAlert: true, message: response.message, title: "Error", alertSeverity: "error"})
			}
		}
	}

	return (
		<Box>
			<CommonModal
				open={open}
				onClose={onClose}
				size={'sm'}
				dialogContent={
					<LoginModalContent
						usernameValidCheck={usernameValidCheck}
						passwordValidCheck={passwordValidCheck}
						alert={alert}
						open={open}
						openRegister={(value) => openRegister(value)}
						setUsername={(value) => setUsername(value)}
						setPassword={(value) => setPassword(value)}
						setRememberChecked={(value) => setRememberChecked(value)}
					/>}
				dialogAction={
					<LoginModalAction
						username={username}
						password={password}
						remember={rememberChecked}
						onClose={onClose}
						onSummit={() => loginHandle()}
					/>
				}
			/>
		</Box>
	)
}

export default LoginModal;
