import * as React from "react";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsSizeOverrides, ButtonPropsVariantOverrides} from "@mui/material/Button/Button";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";


interface ICustomButtonProps {
	label: string
	width?: number
	disabled?: boolean;
	endIcon?: React.ReactNode;
	onClick: () => void
	size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>;
	startIcon?: React.ReactNode;
	variant?: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides>;
}

const BootstrapButton = styled(Button)({
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

const CommonButton = ({ label, onClick, disabled, size = 'medium', width = 100, variant = 'contained', startIcon, endIcon }: ICustomButtonProps) => {
	return (
		<BootstrapButton
			disabled={disabled}
			onClick={onClick}
			size={size}
			variant={variant}
			startIcon={startIcon}
			endIcon={endIcon}
			style={{ width: width }}
			disableRipple
		>
			{label}
		</BootstrapButton>
	)
}
export default CommonButton;