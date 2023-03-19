import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {InputProps as StandardInputProps} from "@mui/material/Input/Input";
import {OverridableStringUnion} from "@mui/types";
import {TextFieldPropsSizeOverrides} from "@mui/material/TextField/TextField";
import * as React from "react";
import Box from "@mui/material/Box";
import {FormHelperText} from "@mui/material";
import {useState} from "react";

const CustomTextFieldValid = styled(TextField)({
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderWidth: 2,
			borderRadius: 50,
			borderColor: '#000000'
		},
		'&:hover fieldset': {
			borderColor: '#00b2ff',
		},
		'&.Mui-focused fieldset': {
			borderColor: '#007fb6',
		}
	},
});

const CustomTextFieldInvalid = styled(TextField)({
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderWidth: 2,
			borderRadius: 50,
			borderColor: '#ff0000'
		},
		'&:hover fieldset': {
			borderColor: '#00b2ff',
		},
		'&.Mui-focused fieldset': {
			borderColor: '#007fb6',
		}
	},
});

interface CommonTextInputProps {
	autoComplete?: string;
	isRequire?: boolean;
	helpText?: string;
	fullWidth?: boolean;
	isValid?: boolean;
	height?: number;
	width?: number;
	autoFocus?: boolean;
	onChange: (value: string) => void;
	onBlur?: () => void;
	size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
	placeholder?: string;
	type?: React.InputHTMLAttributes<unknown>['type'];
	InputProps?: Partial<StandardInputProps>;
}

const CommonTextInput = (props: CommonTextInputProps) => {
	
	const {
		autoComplete,
		isRequire = false,
		helpText,
		fullWidth = true,
		isValid = true,
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
	
	const [showHelpText, setShowHelpText] = useState<boolean>(false);
	const [valid, setValid] = useState<boolean>(true);
	const [value, setValue] = useState<any>();
	
	const handleOnBlur = () => {
		if (isRequire && (value === undefined || value === null || value === "")) {
			setValid(false);
			setShowHelpText(true);
		} else {
			setValid(true);
			setShowHelpText(false);
		}
	}

	return (
		<Box>
			{
				valid ? <CustomTextFieldValid
					required={isRequire}
					margin="dense"
					autoComplete={autoComplete}
					fullWidth={fullWidth}
					style={{
						height: height,
						width: width,
					}}
					autoFocus={autoFocus}
					variant={'outlined'}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							onChange(event.target.value);setValue(event.target.value)}}
					onBlur={() => {handleOnBlur()}}
					size={size}
					placeholder={placeholder}
					InputProps={InputProps}
					type={type}
				/> : <CustomTextFieldInvalid
					margin="dense"
					autoComplete={autoComplete}
					fullWidth={fullWidth}
					style={{
						height: height,
						width: width,
					}}
					autoFocus={autoFocus}
					variant={'outlined'}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						if (onChange) {
							onChange(event.target.value);
						} setValue(event.target.value)}}
					onBlur={() => {
						if (onBlur) {
							onBlur();
						}; handleOnBlur()}}
					size={size}
					placeholder={placeholder}
					value={value}
					InputProps={InputProps}
					type={type}
				/>
			}
			<FormHelperText>{helpText}</FormHelperText>
		</Box>
	)
}
export default CommonTextInput;
