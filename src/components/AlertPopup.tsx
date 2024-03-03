import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle } from '@mui/material';
import Alert from '@mui/material/Alert';
import { AlertColor, AlertPropsVariantOverrides } from '@mui/material/Alert/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { OverridableStringUnion } from '@mui/types';
import React, { memo, useEffect, useState } from 'react';

export interface IAlertDetail {
    alertSeverity?: AlertColor;
    title?: string;
    showAlert?: boolean;
    message?: string;
}

type CommonAlertProps = {
    icon?: React.ReactNode;
    variant: OverridableStringUnion<'standard' | 'filled' | 'outlined', AlertPropsVariantOverrides>;
    alert?: IAlertDetail;
};

const AlertPopup = (props: CommonAlertProps) => {
    const { icon, variant = 'outlined', alert } = props;

    const [open, setOpen] = useState<boolean | undefined>(alert?.showAlert);

    useEffect(() => {
        setOpen(alert?.showAlert);
    }, [alert]);

    return (
        <Collapse in={open}>
            <Alert
                variant={variant}
                severity={alert?.alertSeverity}
                icon={icon}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(!alert?.showAlert);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                <AlertTitle>{alert?.title}</AlertTitle>
                {alert?.message}
            </Alert>
        </Collapse>
    );
};
export default memo(AlertPopup);
