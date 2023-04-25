import * as React from "react";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsSizeOverrides, ButtonPropsVariantOverrides} from "@mui/material/Button/Button";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import {CircularProgress} from "@mui/material";

type CustomButtonProps = {
	label?: string;
	height?: number;
	width?: number;
	backgroundColor?: string;
	labelColor?: string;
	disabled?: boolean;
	endIcon?: React.ReactNode;
	loading?: boolean;
	onClick: () => void;
	size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>;
	startIcon?: React.ReactNode;
	variant?: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides>;
}

const CustomButton = styled(Button)({
	boxShadow: '#a8a8a8',
	textTransform: 'none',
	fontSize: 16,
	borderRadius: 25,
	padding: '6px 12px',
	lineHeight: 1.5,
	backgroundColor: '#ff3333',
	fontFamily: [
		'-apple-system',
		'BlinkMacSystemFont',
		'"Segoe UI"',
		'Roboto',
		'"Helvetica Neue"',
		'Arial',
		'sans-serif',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(','),
	'&:hover': {
		boxShadow: '#a8a8a8',
		backgroundColor: '#69a3ff',
		color: '#000000',
	},
	'&:active': {
		boxShadow: '#a8a8a8',
		backgroundColor: '#94f636',
		color: '#000000',
	}
});

const CommonButton = (props: CustomButtonProps) => {

	const {
		label,
		onClick,
		disabled,
		loading = false,
		size = 'medium',
		width = 100,
		height = 40,
		backgroundColor,
		labelColor,
		variant = 'contained',
		startIcon,
		endIcon
	} = props;

	return (
		<CustomButton
			disabled={disabled}
			onClick={onClick}
			size={size}
			variant={variant}
			startIcon={startIcon}
			endIcon={endIcon}
			sx={{ width: width, height: height, backgroundColor: backgroundColor, color: labelColor }}
			disableRipple
		>
			{
				loading ?
				<CircularProgress
					variant="indeterminate"
					disableShrink
					size={20}
					sx={{ color: labelColor ? '#ffffff' : labelColor }}
				/>
				: label
			}
		</CustomButton>
	)
}
export default React.memo(CommonButton);
