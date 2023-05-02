import React, {useRef, useEffect, memo} from 'react';
import { Box } from '@mui/material';
import {useAppDispatch} from "../redux/hooks";
import {setAlertInfoHeight} from "../redux/slices/commonSlice";

interface Props {
	children: React.ReactNode;
}

const AlertList = ({ children }: Props) => {
	const ref = useRef<HTMLDivElement>(null);
	
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		if (ref.current) {
			dispatch(setAlertInfoHeight(ref.current.clientHeight))
		}
	}, [children]);
	
	return (
		<Box
			ref={ref}
			overflow={'hidden'}
			sx={{ maxHeight: "100px", overflowY: "scroll" }}
		>
			{children}
		</Box>
	);
};
export default memo(AlertList);