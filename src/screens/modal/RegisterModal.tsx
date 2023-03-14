import CommonModal from "../../components/modal/CommonModal";
import React from "react";
import Typography from "@mui/material/Typography";

interface IRegisterModalProps {
    open: boolean;
    back?: boolean;
    title: string;
    onClose: (isOpen: boolean) => void;
    onBack: () => void;
}

const RegisterModal = ({open, back, title, onClose, onBack}: IRegisterModalProps) => {
    return (
        <CommonModal
            open={open}
            back={back}
            onClose={onClose}
            size={'sm'}
            dialogContent={<Typography>Register</Typography>}
            dialogAction={<Typography>Register</Typography>}
        />
    )
}
export default RegisterModal;
