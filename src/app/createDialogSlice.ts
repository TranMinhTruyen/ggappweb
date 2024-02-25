import { createSlice, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';
import { IAlertDetail } from 'components/AlertPopup';

export interface DialogState<I> {
	item?: Partial<I>;
	open: boolean;
	isDirty?: boolean;
	alert?: IAlertDetail;
}

interface SliceProps<S, Reducers extends SliceCaseReducers<S>> {
	name: string;
	initialState: S;
	reducers: ValidateSliceCaseReducers<S, Reducers>;
}

export const createDialogSlice = <
	I,
	S extends DialogState<I>,
	Reducers extends SliceCaseReducers<S>
>({ name = '', initialState, reducers, }: SliceProps<S, Reducers>) => {
	return createSlice({
		name,
		initialState,
		reducers: {
			toggleDialog: state => {
				return {
					...state,
					open: !state.open,
					alert: undefined,
				};
			},
			closeDialog: state => {
				return {
					...state,
					item: undefined,
					open: false,
					alert: undefined,
				}
			},
			setAlert: (state, action: PayloadAction<IAlertDetail>) => {
				const { payload } = action;
				return {
					...state,
					alert: payload,
				};
			},
			...reducers,
		}
	})
}