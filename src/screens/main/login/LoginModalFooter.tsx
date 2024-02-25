import Grid2 from '@mui/material/Unstable_Grid2';
import Button from 'components/Button';
import React, { memo } from 'react';

interface LoginModalActionProps {
	onClose: () => void;
	onLogin: () => void;
}

const LoginModalFooter = (props: LoginModalActionProps) => {
	const { onClose, onLogin } = props;
	
	return (
		<Grid2 container columnSpacing={2}>
			<Grid2>
				<Button variant="contained" onClick={onClose} label={'Cancel'}/>
			</Grid2>
			<Grid2>
				<Button type={'submit'} variant="contained" onClick={onLogin} label={'Login'}/>
			</Grid2>
		</Grid2>
	);
};

export default memo(LoginModalFooter);
