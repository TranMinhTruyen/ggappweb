import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle } from '@mui/material';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from 'app/store';
import { IAlertPrimaryDetail, selectAlert, setAlert } from 'services/main/mainSlice';
import AlertList from 'components/AlertPopupList';
import { filter } from 'lodash';
import { memo, useCallback, useEffect } from 'react';

const MainScreenAlertList = () => {
    const dispatch = useAppDispatch();

    const alert = useAppSelector(selectAlert);

    useEffect(() => {
        const defaultAlert: IAlertPrimaryDetail[] = [
            {
                alertSeverity: 'error',
                title: 'Error alert',
                message: 'This is error alert',
            },
            {
                alertSeverity: 'success',
                title: 'Success alert',
                message: 'This is error alert',
            },
            {
                alertSeverity: 'warning',
                title: 'Warning alert',
                message: 'This is Warning alert',
            },
        ];
        dispatch(setAlert(defaultAlert));
    }, [dispatch]);

    const handleCloseAlert = useCallback(
        (alertItem: IAlertPrimaryDetail) => () => {
            dispatch(setAlert(filter(alert, item => item !== alertItem)));
        },
        [alert, dispatch]
    );

    return (
        <AlertList>
            {alert.map(alertItem => (
                <Alert
                    key={alert.indexOf(alertItem)}
                    severity={alertItem.alertSeverity}
                    variant={'filled'}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={handleCloseAlert(alertItem)}
                        >
                            <CloseIcon fontSize="inherit" />
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
