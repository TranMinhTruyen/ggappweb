import * as React from 'react';
import {useEffect, useState} from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import {AlertTitle} from "@mui/material";
import {AlertColor, AlertPropsVariantOverrides} from "@mui/material/Alert/Alert";
import {OverridableStringUnion} from "@mui/types";

export interface IAlertDetail {
	alertSeverity: AlertColor;
	title: string;
	showAlert: boolean;
	message: string;
}

type CommonAlertProps = {
	icon?: React.ReactNode;
	variant: OverridableStringUnion<'standard' | 'filled' | 'outlined', AlertPropsVariantOverrides>
	alert: IAlertDetail;
}

const CommonAlert = (props: CommonAlertProps) => {
	
	const {
		icon,
		variant = 'outlined',
		alert,
	} = props;
	
	const [open, setOpen] = useState<boolean>(alert.showAlert);
	
	useEffect(() => {
		setOpen(alert.showAlert);
	}, [alert])
	
	return (
		<Collapse in={open}>
			<Alert
				variant={variant}
				severity={alert.alertSeverity}
				icon={icon}
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={() => {
							setOpen(!alert.showAlert);
						}}
					>
						<CloseIcon fontSize="inherit"/>
					</IconButton>
				}
				sx={{mb: 2}}
			>
				<AlertTitle>{alert.title}</AlertTitle>
				{alert.message}
			</Alert>
		</Collapse>
	);
}
export default React.memo(CommonAlert);