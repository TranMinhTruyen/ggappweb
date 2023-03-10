import React, {FC, useState} from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import {Paper, PaperProps} from "@mui/material";
import Draggable from 'react-draggable';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import {LoginRequest} from "../../common/dto/request/LoginRequest";
import {BaseResponse} from "../../common/dto/response/BaseResponse";
import {LoginResponse} from "../../common/dto/response/LoginResponse";
import {useDispatch} from "react-redux";
import {setToken} from "../../redux/slices/tokenSlice";
import LoginApi from "../../common/api/LoginApi";

interface IModalProps {
	open: boolean
	title?: string
	description?: string
	onClose: (isOpen: boolean) => void
}

const PaperComponent: FC<PaperProps> = (props: PaperProps) => {
	return (
		<Draggable
			handle="#draggable-dialog-title"
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} />
		</Draggable>
	);
}

const ModalTitle: FC<IModalProps> = ({open, title, onClose}: IModalProps) => {
	return (
		<DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
			{title}
			{open ? (
				<IconButton
					aria-label="close"
					onClick={() => onClose(false)}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	)
}

const LoginDialog: FC<IModalProps> = ({open, title, onClose, description}: IModalProps) => {

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
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
		<Dialog
			open={open}
			onClose={() => onClose(false)}
			PaperComponent={PaperComponent}
			aria-labelledby={"draggable-dialog-title"}
		>
			<ModalTitle open={open} title={title} onClose={onClose}/>
			<DialogContent>
				<DialogContentText>{description}</DialogContentText>
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
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<AccountCircle />
							</InputAdornment>
						),
						endAdornment : (
							<InputAdornment position="end">
								<AccountCircle />
							</InputAdornment>
						)
					}}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						setPassword(event.target.value);
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={() => onClose(false)}>Cancel</Button>
				<Button variant="contained" onClick={() => loginHandle()}>Login</Button>
			</DialogActions>
		</Dialog>
	)
}

export default LoginDialog;
