import { createDialogSlice, DialogState } from 'app/createDialogSlice';
import { RootState } from 'app/store';

interface RegisterState extends DialogState<any> {

}

const initialState: RegisterState = {
	open: false,
}

export const registerSlice = createDialogSlice({
	name: 'registerState',
	initialState,
	reducers: {},
});

export const {
	toggleDialog: toggleRegisterDialog,
	closeDialog: closeRegisterDialog,
} = registerSlice.actions;

export const selectOpenRegisterDialogItem = (state: RootState) => state.registerState.item;
export const selectOpenRegisterDialog = (state: RootState) => state.registerState.open;

export default registerSlice.reducer;