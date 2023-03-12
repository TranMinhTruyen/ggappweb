import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {Breakpoint, Paper, PaperProps} from "@mui/material";
import Draggable from "react-draggable";

interface ICommonModalProps {
	open: boolean
	title?: string
	size?: Breakpoint
	description?: string
	onClose: (isOpen: boolean) => void
	dialogContent: React.ReactNode
	dialogAction: React.ReactNode
}

interface IModalTitleProps {
	open: boolean
	title?: string
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

const ModalTitle = ({ open, title, onClose }: IModalTitleProps) => {
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

const CommonModal = ({ open, title, onClose, size = 'xs', description, dialogContent, dialogAction }: ICommonModalProps) => {
	return (
		<Dialog
			open={open}
			onClose={() => onClose(false)}
			PaperComponent={PaperComponent}
			aria-labelledby={"draggable-dialog-title"}
			maxWidth={size}
		>
			<ModalTitle open={open} title={title} onClose={onClose} />
			<DialogContent>
				<DialogContentText>{description}</DialogContentText>
				{dialogContent}
			</DialogContent>
			<DialogActions style={{ padding: 24, marginTop: -25 }}>
				{dialogAction}
			</DialogActions>
		</Dialog>
	)
}

export default CommonModal;