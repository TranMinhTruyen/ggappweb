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
import {Avatar, Checkbox, FormControlLabel, Link} from "@mui/material";
import Typography from "@mui/material/Typography";

type LoginModalActionProps = {
	username: string;
	password: string;
	remember: boolean;
	onClose: (isOpen: boolean) => void;
}

type LoginModalProps = {
	open: boolean;
	title: string;
	onClose: () => void;
	openRegister: (isOpen: boolean) => void;
}

type LoginModalContentProps = {
	open: boolean;
	onClose: (isOpen: boolean) => void;
	setUsername: (username: string) => void;
	setPassword: (password: string) => void;
	openRegister: (isOpen: boolean) => void;
	setRememberChecked: (checked: boolean) => void;
}

const LoginModalAction = ({ username, password, remember, onClose }: LoginModalActionProps) => {

	const dispatch = useDispatch();

	const loginHandle = async () => {
		let request: LoginRequest = {
			account: username,
			password: password,
			deviceInfo: {
				deviceOperationSystem: "string",
				deviceName: "string",
				deviceMac: "string",
				deviceIp: "string"
			},
			remember: remember
		};

		const response = await LoginApi.login(request);

		if (response.status === 200) {
			await dispatch(setToken(response.payload));
			onClose(false);
		}
	}

	return (
		<Box>
			<Grid2 container columnSpacing={2}>
				<Grid2>
					<CommonButton variant="contained" onClick={() => onClose(false)} label={"Cancel"} />
				</Grid2>
				<Grid2>
					<CommonButton variant="contained" onClick={() => loginHandle()} label={"Login"} />
				</Grid2>
			</Grid2>
		</Box>
	)
}

const LoginModalContent = ({ open, onClose, setUsername, setPassword, openRegister, setRememberChecked }: LoginModalContentProps) => {

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	useEffect(() => {
		setShowPassword(false);
	}, [open])

	return (
		<Grid2 container spacing={2}>
			<Grid2 container justifyContent="center" xs={12}>
				<Avatar sx={{ width: 150, height: 150 }} />
			</Grid2>
			<Grid2 container justifyContent="center" xs={12}>
				<Typography fontSize={50} fontWeight={'bold'}>Login</Typography>
			</Grid2>
			<Grid2 xs={12}>
				<CommonTextInput
					isRequire={true}
					autoFocus
					placeholder="Username or email"
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
					isRequire={true}
					placeholder="Password"
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
	const [rememberChecked, setRememberChecked] = React.useState<boolean>(false);

	return (
		<Box>
			<CommonModal
				open={open}
				onClose={onClose}
				size={'sm'}
				dialogContent={
					<LoginModalContent
						open={open}
						onClose={onClose}
						openRegister={(value) => openRegister(value)}
						setUsername={(value) => setUsername(value)}
						setPassword={(value) => setPassword(value)}
						setRememberChecked={(value) => setRememberChecked(value)}
					/>}
				dialogAction={<LoginModalAction username={username} password={password} remember={rememberChecked} onClose={onClose} />}
			/>
		</Box>
	)
}

export default LoginModal;
