import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { InputProps as StandardInputProps } from '@mui/material/Input/Input';
import { OverridableStringUnion } from '@mui/types';
import { TextFieldPropsSizeOverrides } from '@mui/material/TextField/TextField';
import React, { memo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { FormHelperText } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import ErrorIcon from '@mui/icons-material/Error';
import { Control, Controller } from 'react-hook-form';

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
	},
	input: {
		'&:-webkit-autofill': {
			WebkitBoxShadow: '0 0 0 1000px rgba(210,210,210,0.8) inset',
			borderRadius: 50,
		}
	}
});

const CustomFormHelperText = styled(FormHelperText)({
	marginLeft: 5,
	fontSize: 15,
	color: '#ff0000'
});

interface CommonTextInputProps {
	name: string;
	control?: Control<any>;
	autoComplete?: string;
	isRequire?: boolean;
	helpText?: string;
	fullWidth?: boolean;
	isValid?: boolean;
	height?: number;
	width?: number;
	autoFocus?: boolean;
	textInputChange?: (value: string) => void;
	textInputBlur?: () => void;
	size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
	placeholder?: string;
	type?: React.InputHTMLAttributes<unknown>['type'];
	InputProps?: Partial<StandardInputProps>;
}

const CommonTextInput = (props: CommonTextInputProps) => {
	
	const {
		name,
		control,
		autoComplete,
		isRequire = false,
		helpText,
		fullWidth = true,
		isValid = true,
		height,
		width,
		autoFocus = false,
		textInputChange,
		textInputBlur,
		size = 'medium',
		placeholder,
		type = 'text',
		InputProps,
		...rest
	} = props;
	
	const [valid, setValid] = useState<boolean>(isValid);
	
	useEffect(() => {
		setValid(isValid);
	}, [isValid]);
	
	const helpTextField = (
		!valid ?
			<Grid2 container sx={{ justify: 'flex-end', alignItems: 'center', marginLeft: 1 }}>
				<ErrorIcon sx={{ color: '#ff0000', fontSize: 15 }}/>
				<CustomFormHelperText>
					{helpText === '' || helpText === null || helpText === undefined ? 'Error' : helpText}
				</CustomFormHelperText>
			</Grid2>
			: null
	);
	
	return (
		<Box>
			<Controller
				name={name}
				control={control}
				render={({ field: { onBlur, onChange, value = '' } }) => (
					<CustomTextFieldValid
						name={name}
						value={value ?? ''}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							if (!valid) {
								setValid(true);
							}
							onChange(event);
							if (textInputChange) {
								textInputChange(event.target.value);
							}
						}}
						onBlur={() => {
							if ((isRequire && (value === undefined || value === null || value === '')) || !valid) {
								setValid(false);
							} else {
								setValid(true);
							}
							onBlur()
							if (textInputBlur) {
								textInputBlur();
							}
						}}
						margin="dense"
						autoComplete={autoComplete}
						fullWidth={fullWidth}
						style={{
							height: height,
							width: width,
						}}
						autoFocus={autoFocus}
						variant={'outlined'}
						size={size}
						placeholder={placeholder}
						InputProps={InputProps}
						type={type}
						{...rest}
					/>
				)}
			/>
			{helpTextField}
		</Box>
	);
};
export default memo(CommonTextInput);
