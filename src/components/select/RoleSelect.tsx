import React, { memo, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Checkbox, FormControl, ListItemText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectCommon, setRoleMaster } from '../../redux/slices/commonSlice';
import { IMasterResponse } from '../../common/dto/response/MasterResponse';
import MasterService from '../../common/sevices/MasterService';

const CustomSelectValid = styled(FormControl)({
	background: 'rgba(210,210,210,0.8)',
	color: '#000000',
	borderRadius: 50,
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: 'rgba(210,210,210,0.8)',
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const RoleSelect = () => {
	const [roleSelect, setRoleSelect] = useState<IMasterResponse | null>(null);
	const commonState = useAppSelector(selectCommon);
	const dispatch = useAppDispatch();
	
	const getRole = async () => {
		const responseData = await MasterService.getByCategory('ROLE');
		if (responseData.status === 200) {
			dispatch(setRoleMaster(responseData.data.payload));
		}
	}
	
	useEffect(() => {
		getRole().then(() => {});
	}, []);
	
	const handleChange = (value: string) => {
		let update = commonState.roleMaster.find((role) => role.value === value);
		if (update !== undefined) {
			setRoleSelect(update);
		}
	};
	
	return (
		<CustomSelectValid>
			<Select
				value={roleSelect?.value !== '' ? roleSelect?.value : ''}
				onChange={(event: SelectChangeEvent) => handleChange(event.target.value)}
				renderValue={() => 'Role: ' + roleSelect?.subValue1}
				MenuProps={{
					PaperProps: {
						style: {
							marginLeft: 2,
							marginTop: 10,
							maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
							width: 250,
						},
					},
				}}
				sx={{
					width: 250,
				}}
			>
				{commonState.roleMaster?.map((item) => (
					<MenuItem key={item.id} value={item.value}>
						<Checkbox checked={item.value === roleSelect?.value}/>
						<ListItemText primary={item.subValue1}/>
					</MenuItem>
				))}
			</Select>
		</CustomSelectValid>
	);
};
export default memo(RoleSelect);