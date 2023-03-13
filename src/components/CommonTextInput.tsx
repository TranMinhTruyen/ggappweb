import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {InputProps as StandardInputProps} from "@mui/material/Input/Input";
import {OverridableStringUnion} from "@mui/types";
import {TextFieldPropsSizeOverrides} from "@mui/material/TextField/TextField";
import * as React from "react";
import {InputBaseProps} from "@mui/material/InputBase";

const CustomTextField = styled(TextField)({
	'&input:valid + fieldset': {
		borderColor: '#000000',
		borderWidth: 2,
	},
	'&input:invalid + fieldset': {
		borderColor: '#ff0000',
		borderWidth: 2,
	},
	'&input:valid:focus + fieldset': {
		borderColor: '#00b2ff',
		borderLeftWidth: 6,
		padding: '4px !important',
	},
	'&input:valid:hover + fieldset': {
		borderColor: '#00b2ff',
		borderLeftWidth: 6,
		padding: '4px !important',
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderWidth: 1,
			borderRadius: 50,
			borderColor: '#000000',
		}
	},
});

interface CommonTextInputProps {
	autoComplete?: string;
	fullWidth?: boolean;
	height?: number;
	width?: number;
	autoFocus?: boolean;
	onChange?: InputBaseProps['onChange'];
	onBlur?: InputBaseProps['onBlur'];
	size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
	placeholder?: string;
	type?: React.InputHTMLAttributes<unknown>['type'];
	InputProps?: Partial<StandardInputProps>;
}

const CommonTextInput = (props: CommonTextInputProps) => {

	const {
		autoComplete,
		fullWidth = true,
		height,
		width,
		autoFocus,
		onChange,
		onBlur,
		size = 'medium',
		placeholder,
		type = 'text',
		InputProps
	} = props;

	return (
		<CustomTextField
			margin="dense"
			autoComplete={autoComplete}
			fullWidth={fullWidth}
			style={{ height: height, width: width }}
			autoFocus={autoFocus}
			variant={'outlined'}
			onChange={onChange}
			onBlur={onBlur}
			size={size}
			placeholder={placeholder}
			InputProps={InputProps}
			type={type}
		/>
	)
}
export default CommonTextInput;
