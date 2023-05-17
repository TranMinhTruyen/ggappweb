import * as React from "react";
import {memo} from "react";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsVariantOverrides} from "@mui/material/Button/Button";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {Badge} from "@mui/material";

type CustomIconButtonProps = {
	height?: number;
	width?: number;
	backgroundColor?: string;
	disabled?: boolean;
	icon?: React.ReactNode;
	loading?: boolean;
	badgeContent?: number;
	onClick: () => void;
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
		backgroundColor: 'rgba(210,210,210,0.8)',
		color: '#000000',
	},
	'&:active': {
		boxShadow: '#a8a8a8',
		backgroundColor: '#94f636',
		color: '#000000',
	}
});

const CommonIconButton = (props: CustomIconButtonProps) => {
	
	const {
		height = 35,
		width = 35,
		backgroundColor,
		disabled = false,
		icon,
		loading = false,
		badgeContent,
		onClick,
		variant = 'contained'
	} = props;
	
	return (
		<Badge badgeContent={badgeContent} max={99} color={"warning"}>
			<CustomButton
				onClick={onClick}
				variant={variant}
				sx={{
					height: height,
					width: width,
					backgroundColor: backgroundColor,
					color: '#000000'
				}}
			>
				{icon}
			</CustomButton>
		</Badge>
	)
}
export default memo(CommonIconButton);