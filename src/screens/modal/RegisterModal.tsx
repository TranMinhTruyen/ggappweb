import CommonModal from "../../components/CommonModal";
import React from "react";
import Typography from "@mui/material/Typography";
import {setOpenLoginModal, setOpenRegisterModal} from "../../redux/slices/commonSlice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {RootState} from "../../redux/store";
import {shallowEqual} from "react-redux";

const RegisterModal = () => {
	
	const dispatch = useAppDispatch();
	
	const {openRegisterModal} = useAppSelector(
		(state: RootState) => ({openRegisterModal: state.commonState.openRegisterModal}),
		shallowEqual
	);
	
	return (
		<CommonModal
			open={openRegisterModal}
			back={true}
			onClose={() => {
				dispatch(setOpenLoginModal(true));
				dispatch(setOpenRegisterModal(false))
			}}
			onBack={() => {
				dispatch(setOpenLoginModal(true));
				dispatch(setOpenRegisterModal(false))
			}}
			size={'sm'}
			dialogContent={<Typography>Register</Typography>}
			dialogAction={<Typography>Register</Typography>}
		/>
	)
}
export default RegisterModal;
