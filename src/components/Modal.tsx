import CommonAlert, { IAlertDetail } from 'components/AlertPopup';
import React, { memo, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Breakpoint, Paper, PaperProps, useMediaQuery } from '@mui/material';
import Draggable from 'react-draggable';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid2 from '@mui/material/Unstable_Grid2';

interface CommonModalProps {
    open: boolean;
    back?: boolean;
    size?: Breakpoint;
    description?: string;
    onClose: () => void;
    onBack?: () => void;
    dialogContent: React.ReactNode;
    dialogFooter: React.ReactNode;
    alert?: IAlertDetail;
}

interface IModalTitleProps {
    open: boolean;
    back?: boolean;
    description?: string;
    onClose: () => void;
    onBack?: () => void;
}

const ModalTitle = (props: IModalTitleProps) => {
    const { open, back = false, onClose, onBack } = props;

    return (
        <Grid2 container direction={'row'} style={{ cursor: 'move' }} id="draggable-dialog-title">
            <Grid2 xs={6} container justifyContent={'flex-start'}>
                {back ? (
                    <IconButton
                        aria-label="back"
                        onClick={onBack}
                        sx={{
                            color: theme => theme.palette.grey[500],
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                ) : null}
            </Grid2>
            <Grid2 xs={6} container justifyContent={'flex-end'}>
                {open ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            color: theme => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </Grid2>
        </Grid2>
    );
};

const Modal = (props: CommonModalProps) => {
    const {
        open,
        back,
        onClose,
        onBack,
        size = 'xs',
        description,
        dialogContent,
        dialogFooter,
        alert,
    } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const nodeRef = React.useRef(null);
    const paperComponent = useCallback((props: PaperProps) => {
        return (
            <Draggable
                nodeRef={nodeRef}
                handle="#draggable-dialog-title"
                cancel='[class*="MuiDialogContent-root"]'
            >
                <Paper ref={nodeRef} {...props} />
            </Draggable>
        );
    }, []);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperComponent={paperComponent}
            aria-labelledby={'draggable-dialog-title'}
            maxWidth={size}
            fullWidth={true}
            fullScreen={fullScreen}
        >
            <ModalTitle open={open} back={back} onClose={onClose} onBack={onBack} />
            <Divider />
            <Grid2 xs={12} sx={{ padding: 1 }}>
                <CommonAlert variant={'filled'} alert={alert} />
            </Grid2>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
                {dialogContent}
            </DialogContent>
            <Divider />
            <DialogActions style={{ padding: 10, marginRight: 14 }}>{dialogFooter}</DialogActions>
        </Dialog>
    );
};

export default memo(Modal);
