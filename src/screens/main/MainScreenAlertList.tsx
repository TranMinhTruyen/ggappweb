import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import { IAlertPrimaryDetail, setAlert } from '../../redux/slices/commonSlice';
import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle } from '@mui/material';
import AlertList from '../../components/AlertList';
import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { shallowEqual } from 'react-redux';

const MainScreenAlertList = () => {
	const dispatch = useAppDispatch();
	
	const { alert } = useAppSelector(
		(state: RootState) => ({ alert: state.commonState.alert }),
		shallowEqual
	);
	
	const handleCloseAlert = (alertItem: IAlertPrimaryDetail) => {
		dispatch(setAlert(alert.filter((item) => item !== alertItem)));
	};
	
	return (
		<AlertList>
			{alert.map((alertItem) => (
				<Alert
					key={alert.indexOf(alertItem)}
					severity={alertItem.alertSeverity}
					variant={'filled'}
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => handleCloseAlert(alertItem)}
						>
							<CloseIcon fontSize="inherit"/>
						</IconButton>
					}
					sx={{ mb: 2 }}
				>
					<AlertTitle>{alertItem.title}</AlertTitle>
					{alertItem.message}
				</Alert>
			))}
		</AlertList>
	);
};
export default memo(MainScreenAlertList);