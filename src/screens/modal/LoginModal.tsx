import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {LoginRequest} from "../../common/dto/request/LoginRequest";
import {useDispatch} from "react-redux";
import {setToken} from "../../redux/slices/tokenSlice";
import LoginApi from "../../common/api/LoginApi";
import Box from "@mui/material/Box";
import CommonModal from "../../components/CommonModal";
import Grid2 from "@mui/material/Unstable_Grid2";
import CommonButton from "../../components/CommonButton";
import CommonTextInput from "../../components/CommonTextInput";
import {Alert, Avatar, Checkbox, FormControlLabel, Link} from "@mui/material";
import Typography from "@mui/material/Typography";

type AlertProps = {
	showAlert: boolean;
	message: string;
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
	isValid: boolean;
	showAlert?: AlertProps;
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

	const { open, isValid, showAlert, setUsername, setPassword, openRegister, setRememberChecked } = props;
	
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	useEffect(() => {
		setShowPassword(false);
	}, [open])

	return (
		<Grid2 container spacing={2}>
			<Grid2 xs={12} sx={{ marginBottom: 2 }}>
				{
					showAlert?.showAlert ? <Alert variant="filled" severity="error">{showAlert.message}</Alert>
						: null
				}
			</Grid2>
			<Grid2 container justifyContent="center" xs={12}>
				<Avatar sx={{ width: 150, height: 150 }} />
			</Grid2>
			<Grid2 container justifyContent="center" xs={12}>
				<Typography fontSize={50} fontWeight={'bold'}>Login</Typography>
			</Grid2>
			<Grid2 xs={12}>
				<CommonTextInput
					isValid={isValid}
					isRequire={true}
					autoFocus
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
					isValid={isValid}
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
	const [valid, setValid] = useState<boolean>(true);
	
	useEffect(() => {
		setValid(true);
	}, [open])
	
	const dispatch = useDispatch();
	
	const loginHandle = async () => {
		
		if (username === "" || password === "" || username === null || password === null) {
			setValid(false);
		}  else {
			setValid(true);
		}
		
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
						isValid={valid}
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
