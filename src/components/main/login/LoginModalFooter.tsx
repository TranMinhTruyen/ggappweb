import Grid2 from '@mui/material/Unstable_Grid2';
import Button from 'components/Button';
import { memo } from 'react';

interface LoginModalFooterProps {
    onClose: () => void;
    onLogin: () => void;
}

const LoginModalFooter = (props: LoginModalFooterProps) => {
    const { onClose, onLogin } = props;

    return (
        <Grid2 container columnSpacing={2}>
            <Grid2>
                <Button variant="contained" onClick={onClose} label={'Cancel'} />
            </Grid2>
            <Grid2>
                <Button type={'submit'} variant="contained" onClick={onLogin} label={'Login'} />
            </Grid2>
        </Grid2>
    );
};

export default memo(LoginModalFooter);
