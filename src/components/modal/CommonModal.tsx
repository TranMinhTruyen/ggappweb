import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {Breakpoint, Paper, PaperProps, useMediaQuery} from "@mui/material";
import Draggable from "react-draggable";
import {useTheme} from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid2 from "@mui/material/Unstable_Grid2";

interface ICommonModalProps {
	open: boolean
	back?: boolean
	size?: Breakpoint
	description?: string
	onClose: (isOpen: boolean) => void
	dialogContent: React.ReactNode
	dialogAction: React.ReactNode
}

interface IModalTitleProps {
	open: boolean
	back?: boolean
	description?: string
	onClose: (isOpen: boolean) => void
}

const PaperComponent = (props: PaperProps) => {
	return (
		<Draggable
			handle="#draggable-dialog-title"
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} />
		</Draggable>
	);
}

const ModalTitle = ({ open, back = false, onClose }: IModalTitleProps) => {
	return (
		<Grid2 container direction={"row"} style={{ cursor: 'move' }} id="draggable-dialog-title">
			<Grid2 xs={6} container justifyContent={"flex-start"}>
				{back ? (
					<IconButton
						aria-label="close"
						onClick={() => onClose(false)}
						sx={{
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<ArrowBackIcon />
					</IconButton>
				) : null}
			</Grid2>
			<Grid2 xs={6} container justifyContent={"flex-end"}>
				{open ? (
						<IconButton
							aria-label="close"
							onClick={() => onClose(false)}
							sx={{
								color: (theme) => theme.palette.grey[500],
							}}
						>
							<CloseIcon />
						</IconButton>
				) : null}
			</Grid2>
		</Grid2>
	)
}

const CommonModal = ({ open, back, onClose, size = 'xs', description, dialogContent, dialogAction }: ICommonModalProps) => {

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Dialog
			open={open}
			onClose={() => onClose(false)}
			PaperComponent={PaperComponent}
			aria-labelledby={"draggable-dialog-title"}
			maxWidth={size}
			fullScreen={fullScreen}
		>
			<ModalTitle open={open} back={back} onClose={onClose} />
			<Divider/>
			<DialogContent>
				<DialogContentText>{description}</DialogContentText>
				{dialogContent}
			</DialogContent>
			<Divider/>
			<DialogActions style={{ padding: 10, marginRight: 14 }}>
				{dialogAction}
			</DialogActions>
		</Dialog>
	)
}

export default CommonModal;
