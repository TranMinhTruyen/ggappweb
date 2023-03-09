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
import qs from "qs";

interface IModalProps {
	open: boolean
	title?: string
	description?: string
	onClose: (isOpen: boolean) => void
}

interface LoginRequest {
	account: string,
	password: string,
	deviceInfo: {
		deviceOperationSystem: "string",
		deviceName: "string",
		deviceMac: "string",
		deviceIp: "string"
	},
	remember: boolean
}

interface BaseResponse {
	timestamp: string,
	status: number,
	statusname: string,
	message: string,
	payload: LoginResponse
}

interface LoginResponse {
	accessToken: string,
	role: string,
	authorities: [],
	accountSettingsResponse: null
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

const ModalTitle: FC<IModalProps> = (props: IModalProps) => {
	return (
		<DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
			{props.title}
			{props.open ? (
				<IconButton
					aria-label="close"
					onClick={() => props.onClose(false)}
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

const LoginDialog: FC<IModalProps> = (props: IModalProps) => {

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

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
		}
		const {data, status} = await axios.post<BaseResponse>(
			'http://localhost:8080/api/account/login',
			request
		);
		if (data.status === 200) {
			console.log(data)
			props.onClose(false)
		}
	}

	return (
		<Dialog
			open={props.open}
			onClose={() => props.onClose(false)}
			PaperComponent={PaperComponent}
			aria-labelledby="draggable-dialog-title"
		>
			<ModalTitle open={props.open} title={props.title} onClose={props.onClose}/>
			<DialogContent>
				<DialogContentText>{props.description}</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Username or Email"
					type="email"
					fullWidth
					variant="standard"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						setUsername(event.target.value);
					}}
				/>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Password"
					type="email"
					fullWidth
					variant="standard"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						setPassword(event.target.value);
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={() => props.onClose(false)}>Cancel</Button>
				<Button variant="contained" onClick={() => loginHandle()}>Login</Button>
			</DialogActions>
		</Dialog>
	)
}

export default LoginDialog;
