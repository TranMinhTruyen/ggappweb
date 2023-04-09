import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {InputProps as StandardInputProps} from "@mui/material/Input/Input";
import {OverridableStringUnion} from "@mui/types";
import {TextFieldPropsSizeOverrides} from "@mui/material/TextField/TextField";
import React, {useEffect} from "react";
import Box from "@mui/material/Box";
import {FormHelperText} from "@mui/material";
import {useState} from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import ErrorIcon from '@mui/icons-material/Error';

const CustomTextFieldValid = styled(TextField)({
	background: 'rgba(210,210,210,0.8)',
	color: '#000000',
	borderRadius: 50,
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: '#ffffff',
			borderRadius: 50,
		},
		'&:hover fieldset': {
			borderColor: '#00b2ff'
		},
		'& .Mui-focused fieldset': {
			borderColor: '#007fb6'
		},
		'& .Mui-invalid': {
			borderColor: '#94f636'
		},
	},
});

const CustomFormHelperText = styled(FormHelperText)({
	marginLeft: 5,
	fontSize: 15,
	color: '#ff0000'
});

type CommonTextInputProps = {
	autoComplete?: string;
	isRequire?: boolean;
	helpText?: string;
	fullWidth?: boolean;
	isValid?: boolean;
	height?: number;
	width?: number;
	autoFocus?: boolean;
	onChange: (value: string) => void;
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
		autoFocus = false,
		onChange,
		size = 'medium',
		placeholder,
		type = 'text',
		InputProps
	} = props;
	
	const [valid, setValid] = useState<boolean>(isValid);
	const [value, setValue] = useState<any>();
	
	useEffect(() => {
		setValid(isValid);
	}, [isValid])
	
	const handleCheckValid = () => {
		if ((isRequire && (value === undefined || value === null || value === "")) || !valid) {
			setValid(false);
		} else {
			setValid(true);
		}
	}

	return (
		<Box>
			<CustomTextFieldValid
				error={!valid}
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
					onChange(event.target.value);
					setValue(event.target.value);
					if (!valid) {
						setValid(true)
					}
				}}
				onBlur={() => {
					handleCheckValid();
				}}
				size={size}
				placeholder={placeholder}
				InputProps={InputProps}
				type={type}
			/>
			{
				!valid ?
				<Grid2 container sx={{justify: "flex-end", alignItems: "center", marginLeft: 1}}>
					<ErrorIcon sx={{ color: '#ff0000', fontSize: 15 }}/>
					<CustomFormHelperText>
						{ helpText === "" || helpText === null || helpText === undefined ? "Error" : helpText}
					</CustomFormHelperText>
				</Grid2>
				: null
			}
		</Box>
	)
};
export default CommonTextInput;
