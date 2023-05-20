import CommonModal from '../../../components/CommonModal';
import React from 'react';
import Typography from '@mui/material/Typography';
import { setOpenLoginModal, setOpenRegisterModal } from '../../../redux/slices/commonSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { shallowEqual } from 'react-redux';

const RegisterModal = () => {
	
	const dispatch = useAppDispatch();
	
	const { openRegisterModal } = useAppSelector(
		(state: RootState) => ({ openRegisterModal: state.commonState.openRegisterModal }),
		shallowEqual
	);
	
	const handleClose = () => {
		dispatch(setOpenRegisterModal(false));
	};
	
	const handleBack = () => {
		dispatch(setOpenLoginModal(true));
		dispatch(setOpenRegisterModal(false));
	};
	
	return (
		<CommonModal
			open={openRegisterModal}
			back={true}
			onClose={handleClose}
			onBack={handleBack}
			size={'sm'}
			dialogContent={<Typography>Register</Typography>}
			dialogAction={<Typography>Register</Typography>}
		/>
	);
};
export default RegisterModal;
