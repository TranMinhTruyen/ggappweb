import CommonModal from "../../components/CommonModal";
import React from "react";
import Typography from "@mui/material/Typography";

type RegisterModalProps = {
    open: boolean;
    back?: boolean;
    title: string;
    onClose: () => void;
    onBack: () => void;
}

const RegisterModal = ({open, back, title, onClose, onBack}: RegisterModalProps) => {
    return (
        <CommonModal
            open={open}
            back={back}
            onClose={onClose}
            onBack={onBack}
            size={'sm'}
            dialogContent={<Typography>Register</Typography>}
            dialogAction={<Typography>Register</Typography>}
        />
    )
}
export default RegisterModal;
