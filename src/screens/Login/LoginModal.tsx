import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
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
import CommonModal from "../../components/Modal/CommonModal";
import Grid2 from "@mui/material/Unstable_Grid2";
import CommonButton from "../../components/CustomButton/CommonButton";

interface ILoginModalActionProps {
	username: string
	password: string
	onClose: (isOpen: boolean) => void
}

interface ILoginModalProps {
	open: boolean
	title: string
	onClose: (isOpen: boolean) => void
}

interface ILoginModalContentProps {
	open: boolean
	setUsername: (username: string) => void
	setPassword: (password: string) => void
}

const LoginModalAction = ({ username, password, onClose }: ILoginModalActionProps) => {
	
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
			remember: true
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

const LoginModalContent = ({ open, setUsername, setPassword }: ILoginModalContentProps) => {
	
	const [showPassword, setShowPassword] = useState<boolean>(false);
	
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	
	useEffect(() => {
		setShowPassword(false);
	}, [open])
	
	return (
		<Box>
			<TextField
				autoFocus
				margin="dense"
				label="Username or email"
				fullWidth
				variant="outlined"
				placeholder="Username or email"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<AccountCircle />
						</InputAdornment>
					),
				}}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setUsername(event.target.value);
				}}
			/>
			<TextField
				margin="dense"
				id="name"
				label="Password"
				fullWidth
				variant="outlined"
				placeholder="Password"
				type={showPassword ? 'text' : 'password'}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<KeyIcon />
						</InputAdornment>
					),
					endAdornment : (
						<InputAdornment position="end">
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
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setPassword(event.target.value);
				}}
			/>
		</Box>
	)
}

const LoginModal = ({ open, title, onClose }: ILoginModalProps) => {

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<CommonModal
			open={open}
			onClose={onClose}
			title={title}
			dialogContent={<LoginModalContent open={open} setUsername={(value) => setUsername(value)} setPassword={(value) => setPassword(value)}/>}
			dialogAction={<LoginModalAction username={username} password={password} onClose={onClose} />}
		/>
	)
}

export default LoginModal;
