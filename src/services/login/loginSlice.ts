import { createDialogSlice, DialogState } from 'app/createDialogSlice';
import { RootState } from 'app/store';
import { LoginRequest } from 'common/dto/request/LoginRequest';
import { IAlertDetail } from 'components/AlertPopup';

interface LoginState extends DialogState<LoginRequest>{
	alert?: IAlertDetail;
}

const initialState: LoginState = {
	open: false,
}

export const loginSlice = createDialogSlice({
	name: 'loginState',
	initialState,
	reducers: {},
});

export const {
	toggleDialog: toggleLoginDialog,
	closeDialog: closeLoginDialog,
	setAlert: setLoginAlert,
} = loginSlice.actions;

export const selectOpenLoginDialogItem = (state: RootState) => state.loginState.item;
export const selectOpenLoginDialog = (state: RootState) => state.loginState.open;
export const selectAlertLoginDialog = (state: RootState) => state.loginState.alert;

export default loginSlice.reducer;