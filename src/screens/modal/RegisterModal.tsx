import CommonModal from "../../components/CommonModal";
import React from "react";
import Typography from "@mui/material/Typography";
import {setOpenLoginModal, setOpenRegisterModal} from "../../redux/slices/commonSlice";
import {useAppDispatch} from "../../redux/hooks";

type RegisterModalProps = {
    open: boolean;
    back?: boolean;
    title: string;
}

const RegisterModal = ({open, back, title}: RegisterModalProps) => {

    const dispatch = useAppDispatch();

    return (
        <CommonModal
            open={open}
            back={back}
            onClose={() => {dispatch(setOpenLoginModal(true)); dispatch(setOpenRegisterModal(false))}}
            onBack={() => {dispatch(setOpenLoginModal(true)); dispatch(setOpenRegisterModal(false))}}
            size={'sm'}
            dialogContent={<Typography>Register</Typography>}
            dialogAction={<Typography>Register</Typography>}
        />
    )
}
export default RegisterModal;
