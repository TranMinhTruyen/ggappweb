
type CommonFormControlProps = {

}

const CommonFormControl = () => {

}
export default CommonFormControl;
import Box from "@mui/material/Box";
import CommonTextInput from "./CommonTextInput";
import {OverridableStringUnion} from "@mui/types";
import {TextFieldPropsSizeOverrides} from "@mui/material/TextField/TextField";
import * as React from "react";
import {InputProps as StandardInputProps} from "@mui/material/Input/Input";
import {FormControl, FormHelperText, useFormControl} from "@mui/material";
import {useState} from "react";

type CommonFormControlProps = {
	isRequire: boolean;
	helpText: string;
	autoComplete?: string;
	fullWidth?: boolean;
	height?: number;
	width?: number;
	autoFocus?: boolean;
	size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
	placeholder?: string;
	type?: React.InputHTMLAttributes<unknown>['type'];
	InputProps?: Partial<StandardInputProps>;
}

const CommonFormControl = (props: CommonFormControlProps) => {
	
	const {
		isRequire,
		helpText,
		autoComplete,
		fullWidth = true,
		height,
		width,
		autoFocus,
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
		<Box component="form" autoComplete="off">
			<FormControl fullWidth={fullWidth}
			             required={isRequire}
			             sx={{ width: width, height: height }}>
			</FormControl>
			{showHelpText ? <FormHelperText>{helpText}</FormHelperText> : null}
		</Box>
	)
}
export default CommonFormControl;