import { toggleLoginDialog } from 'services/login/loginSlice';
import { selectOpenRegisterDialog, toggleRegisterDialog } from 'services/register/registerSlice';
import CommonModal from 'components/Modal';
import { useCallback } from 'react';
import Typography from '@mui/material/Typography';
import { setOpenRegisterModal } from 'services/main/mainSlice';
import Grid2 from '@mui/material/Unstable_Grid2';
// import { Avatar } from '@mui/material';
// import InputAdornment from '@mui/material/InputAdornment';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import KeyIcon from '@mui/icons-material/Key';
// import IconButton from '@mui/material/IconButton';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import { selectAccessToken } from 'services/auth/authSlice';
// import CommonButton from 'components/Button';
// import RoleSelect from '../../../components/select/RoleSelect';
// import masterService from '../../../services/master/masterService';
import { useAppDispatch, useAppSelector } from 'app/store';
// import TextInput from 'components/TextInput';

interface RegisterModalContentProps {
    open: boolean;
}

const RegisterContent = (props: RegisterModalContentProps) => {
    //   const [showPassword, setShowPassword] = useState<boolean>(false);
    //   const handleClickShowPassword = () => setShowPassword(show => !show);
    //   const accessToken = useAppSelector(selectAccessToken);
    //   const dispatch = useAppDispatch();

    //   const employee = (
    //     <Grid2 justifyContent="center" xs={12} spacing={2}>
    //       <Grid2 justifyContent="center" xs={12}>
    //         <Typography fontWeight={'bold'}>Employee setting</Typography>
    //       </Grid2>
    //       <RoleSelect></RoleSelect>
    //       <TextInput
    //         name={'Authorities'}
    //         isRequire={true}
    //         placeholder={'Authorities'}
    //         helpText={'This is require!'}
    //         InputProps={{
    //           startAdornment: (
    //             <InputAdornment position="start">
    //               <AccountCircle />
    //             </InputAdornment>
    //           ),
    //         }}
    //         onChange={value => {}}
    //       />
    //       <TextInput
    //         name={'Position'}
    //         isRequire={true}
    //         placeholder={'Position'}
    //         helpText={'This is require!'}
    //         InputProps={{
    //           startAdornment: (
    //             <InputAdornment position="start">
    //               <AccountCircle />
    //             </InputAdornment>
    //           ),
    //         }}
    //         onChange={value => {}}
    //       />
    //       <TextInput
    //         name={'Department name'}
    //         isRequire={true}
    //         placeholder={'Department name'}
    //         helpText={'This is require!'}
    //         InputProps={{
    //           startAdornment: (
    //             <InputAdornment position="start">
    //               <AccountCircle />
    //             </InputAdornment>
    //           ),
    //         }}
    //         onChange={value => {}}
    //       />
    //       <TextInput
    //         name={'Level'}
    //         isRequire={true}
    //         placeholder={'Level'}
    //         helpText={'This is require!'}
    //         InputProps={{
    //           startAdornment: (
    //             <InputAdornment position="start">
    //               <AccountCircle />
    //             </InputAdornment>
    //           ),
    //         }}
    //         onChange={value => {}}
    //       />
    //       <TextInput
    //         name={'Hire date'}
    //         isRequire={true}
    //         placeholder={'Hire date'}
    //         helpText={'This is require!'}
    //         InputProps={{
    //           startAdornment: (
    //             <InputAdornment position="start">
    //               <AccountCircle />
    //             </InputAdornment>
    //           ),
    //         }}
    //         onChange={value => {}}
    //       />
    //     </Grid2>
    //   );

    return (
        <Grid2 container spacing={2}>
            <Grid2 container justifyContent="center" xs={12}>
                <Typography fontSize={50} fontWeight={'bold'}>
                    Register
                </Typography>
            </Grid2>
            {/*<Grid2 container justifyContent="center" xs={12}>*/}
            {/*	<Grid2 justifyContent="center" xs={8}>*/}
            {/*		<CommonTextInput*/}
            {/*			isRequire={true}*/}
            {/*			placeholder={'Username'}*/}
            {/*			helpText={'This is require!'}*/}
            {/*			InputProps={{*/}
            {/*				startAdornment: (*/}
            {/*					<InputAdornment position="start">*/}
            {/*						<AccountCircle/>*/}
            {/*					</InputAdornment>*/}
            {/*				),*/}
            {/*			}}*/}
            {/*			onChange={(value) => {*/}
            {/*			}}*/}
            {/*		/>*/}
            {/*		<CommonTextInput*/}
            {/*			isRequire={true}*/}
            {/*			placeholder="Password"*/}
            {/*			helpText={'This is require!'}*/}
            {/*			type={showPassword ? 'text' : 'password'}*/}
            {/*			InputProps={{*/}
            {/*				startAdornment: (*/}
            {/*					<InputAdornment position="start">*/}
            {/*						<KeyIcon/>*/}
            {/*					</InputAdornment>*/}
            {/*				),*/}
            {/*				endAdornment: (*/}
            {/*					<InputAdornment position="end" style={{ marginRight: 5 }}>*/}
            {/*						<IconButton*/}
            {/*							aria-label="toggle password visibility"*/}
            {/*							onClick={handleClickShowPassword}*/}
            {/*							edge="end"*/}
            {/*						>*/}
            {/*							{showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}*/}
            {/*						</IconButton>*/}
            {/*					</InputAdornment>*/}
            {/*				)*/}
            {/*			}}*/}
            {/*			onChange={(value) => {*/}
            {/*			}}*/}
            {/*		/>*/}
            {/*	</Grid2>*/}
            {/*	<Grid2 container justifyContent="center" xs={4}>*/}
            {/*		<Avatar sx={{ width: 150, height: 150 }}/>*/}
            {/*	</Grid2>*/}
            {/*</Grid2>*/}
            {/*<Grid2 justifyContent="center" xs={12}>*/}
            {/*	<Grid2 justifyContent="center" xs={12}>*/}
            {/*		<Typography fontWeight={'bold'}>Infomation</Typography>*/}
            {/*	</Grid2>*/}
            {/*	<CommonTextInput*/}
            {/*		isRequire={true}*/}
            {/*		placeholder={'Full Name'}*/}
            {/*		helpText={'This is require!'}*/}
            {/*		InputProps={{*/}
            {/*			startAdornment: (*/}
            {/*				<InputAdornment position="start">*/}
            {/*					<AccountCircle/>*/}
            {/*				</InputAdornment>*/}
            {/*			),*/}
            {/*		}}*/}
            {/*		onChange={(value) => {*/}
            {/*		}}*/}
            {/*	/>*/}
            {/*	<CommonTextInput*/}
            {/*		isRequire={true}*/}
            {/*		placeholder={'Email'}*/}
            {/*		helpText={'This is require!'}*/}
            {/*		InputProps={{*/}
            {/*			startAdornment: (*/}
            {/*				<InputAdornment position="start">*/}
            {/*					<AccountCircle/>*/}
            {/*				</InputAdornment>*/}
            {/*			),*/}
            {/*		}}*/}
            {/*		onChange={(value) => {*/}
            {/*		}}*/}
            {/*	/>*/}
            {/*	<CommonTextInput*/}
            {/*		isRequire={true}*/}
            {/*		placeholder={'Phone Number'}*/}
            {/*		helpText={'This is require!'}*/}
            {/*		InputProps={{*/}
            {/*			startAdornment: (*/}
            {/*				<InputAdornment position="start">*/}
            {/*					<AccountCircle/>*/}
            {/*				</InputAdornment>*/}
            {/*			),*/}
            {/*		}}*/}
            {/*		onChange={(value) => {*/}
            {/*		}}*/}
            {/*	/>*/}
            {/*	<CommonTextInput*/}
            {/*		isRequire={true}*/}
            {/*		placeholder={'Birthday'}*/}
            {/*		helpText={'This is require!'}*/}
            {/*		InputProps={{*/}
            {/*			startAdornment: (*/}
            {/*				<InputAdornment position="start">*/}
            {/*					<AccountCircle/>*/}
            {/*				</InputAdornment>*/}
            {/*			),*/}
            {/*		}}*/}
            {/*		onChange={(value) => {*/}
            {/*		}}*/}
            {/*	/>*/}
            {/*	<CommonTextInput*/}
            {/*		isRequire={true}*/}
            {/*		placeholder={'Address'}*/}
            {/*		helpText={'This is require!'}*/}
            {/*		InputProps={{*/}
            {/*			startAdornment: (*/}
            {/*				<InputAdornment position="start">*/}
            {/*					<AccountCircle/>*/}
            {/*				</InputAdornment>*/}
            {/*			),*/}
            {/*		}}*/}
            {/*		onChange={(value) => {*/}
            {/*		}}*/}
            {/*	/>*/}
            {/*	<CommonTextInput*/}
            {/*		isRequire={true}*/}
            {/*		placeholder={'Ward'}*/}
            {/*		helpText={'This is require!'}*/}
            {/*		InputProps={{*/}
            {/*			startAdornment: (*/}
            {/*				<InputAdornment position="start">*/}
            {/*					<AccountCircle/>*/}
            {/*				</InputAdornment>*/}
            {/*			),*/}
            {/*		}}*/}
            {/*		onChange={(value) => {*/}
            {/*		}}*/}
            {/*	/>*/}
            {/*	<CommonTextInput*/}
            {/*		isRequire={true}*/}
            {/*		placeholder={'District'}*/}
            {/*		helpText={'This is require!'}*/}
            {/*		InputProps={{*/}
            {/*			startAdornment: (*/}
            {/*				<InputAdornment position="start">*/}
            {/*					<AccountCircle/>*/}
            {/*				</InputAdornment>*/}
            {/*			),*/}
            {/*		}}*/}
            {/*		onChange={(value) => {*/}
            {/*		}}*/}
            {/*	/>*/}
            {/*	<CommonTextInput*/}
            {/*		isRequire={true}*/}
            {/*		placeholder={'Province'}*/}
            {/*		helpText={'This is require!'}*/}
            {/*		InputProps={{*/}
            {/*			startAdornment: (*/}
            {/*				<InputAdornment position="start">*/}
            {/*					<AccountCircle/>*/}
            {/*				</InputAdornment>*/}
            {/*			),*/}
            {/*		}}*/}
            {/*		onChange={(value) => {*/}
            {/*		}}*/}
            {/*	/>*/}
            {/*	<CommonTextInput*/}
            {/*		isRequire={true}*/}
            {/*		placeholder={'Post Code'}*/}
            {/*		helpText={'This is require!'}*/}
            {/*		InputProps={{*/}
            {/*			startAdornment: (*/}
            {/*				<InputAdornment position="start">*/}
            {/*					<AccountCircle/>*/}
            {/*				</InputAdornment>*/}
            {/*			),*/}
            {/*		}}*/}
            {/*		onChange={(value) => {*/}
            {/*		}}*/}
            {/*	/>*/}
            {/*	<CommonTextInput*/}
            {/*		isRequire={true}*/}
            {/*		placeholder={'Citizen ID'}*/}
            {/*		helpText={'This is require!'}*/}
            {/*		InputProps={{*/}
            {/*			startAdornment: (*/}
            {/*				<InputAdornment position="start">*/}
            {/*					<AccountCircle/>*/}
            {/*				</InputAdornment>*/}
            {/*			),*/}
            {/*		}}*/}
            {/*		onChange={(value) => {*/}
            {/*		}}*/}
            {/*	/>*/}
            {/*</Grid2>*/}
            {/*{employee}*/}
        </Grid2>
    );
};

const RegisterModalAction = () => {
    const dispatch = useAppDispatch();

    //   const handleCancel = () => {
    //     dispatch(setOpenRegisterModal(false));
    //   };

    return (
        <Grid2 container columnSpacing={2}>
            {/*<Grid2>*/}
            {/*	<CommonButton variant="contained" onClick={handleCancel} label={'Cancel'}/>*/}
            {/*</Grid2>*/}
            {/*<Grid2>*/}
            {/*	<CommonButton variant="contained" onClick={() => {*/}
            {/*	}} label={'Register'}/>*/}
            {/*</Grid2>*/}
        </Grid2>
    );
};

const RegisterModal = () => {
    const dispatch = useAppDispatch();

    const openRegisterModal = useAppSelector(selectOpenRegisterDialog);

    const handleClose = useCallback(() => {
        dispatch(toggleRegisterDialog());
        dispatch(toggleLoginDialog());
    }, [dispatch]);

    return (
        <CommonModal
            open={openRegisterModal}
            back={true}
            size={'sm'}
            onClose={handleClose}
            onBack={handleClose}
            dialogContent={<RegisterContent open={openRegisterModal} />}
            dialogFooter={<RegisterModalAction />}
        />
    );
};
export default RegisterModal;
