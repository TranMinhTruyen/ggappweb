import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectStore, setStore } from '../../redux/slices/productSlice';
import React, { memo, useEffect, useState } from 'react';
import { StoreResponse } from '../../common/dto/response/StoreResponse';
import StoreService from '../../common/sevices/StoreService';
import { Checkbox, FormControl, ListItemText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PaginationResponse } from '../../common/dto/response/PaginationResponse';

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

const StoreSelect = () => {
	
	const dispatch = useAppDispatch();
	const storeSlice = useAppSelector(selectStore);
	const [storeSelect, setStoreSelect] = useState<StoreResponse | any>(storeSlice);
	const [storeData, setStoreData] = useState<PaginationResponse<StoreResponse>>({
		data: [],
		totalRecord: 0,
		page: 0,
		size: 0,
		totalPage: 0
	});
	const [page, setPage] = useState<number>(1);
	
	useEffect(() => {
		async function getAllStore() {
			const responseData = await StoreService.getAllStore(page);
			if (responseData.status === 200) {
				if (page === 1) {
					setStoreData(responseData.data.payload);
				} else {
					setStoreData((prevState) => ({
						...prevState,
						data: [...prevState.data, ...responseData.data.payload.data]
					}));
				}
				if (sessionStorage.getItem('storeSelect') === null) {
					dispatch(setStore(responseData.data.payload.data[0]));
					setStoreSelect(responseData.data.payload.data[0]);
				} else {
					dispatch(setStore(JSON.parse(sessionStorage.getItem('storeSelect') || '{}')));
					setStoreSelect(JSON.parse(sessionStorage.getItem('storeSelect') || '{}'));
				}
			}
		}
		
		getAllStore().then(() => {
		});
		// eslint-disable-next-line
	}, [page]);
	
	const onMenuScroll = () => {
		if (storeData.totalPage !== null && storeData.totalPage > page) {
			setPage((prevState: number) => prevState + 1);
		}
	};
	
	const handleChange = (id: number) => {
		let update = storeData.data.find((store) => store.id === id);
		if (update !== undefined) {
			dispatch(setStore(update));
			setStoreSelect(update);
			sessionStorage.setItem('storeSelect', JSON.stringify(update));
		}
	};
	
	return (
		<CustomSelectValid>
			<Select
				value={storeSelect.id !== 0 ? storeSelect.id : ''}
				onChange={(event: SelectChangeEvent) => handleChange(parseInt(event.target.value))}
				renderValue={() => 'Store: ' + storeSelect.storeCode}
				MenuProps={{
					PaperProps: {
						style: {
							marginTop: 10,
							maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
							width: 250,
						},
						onScroll: (event) => {
							if (event.currentTarget.scrollTop + event.currentTarget.clientHeight >= event.currentTarget.scrollHeight) {
								onMenuScroll();
							}
						}
					},
				}}
				sx={{
					height: 35,
					width: 200,
				}}
			>
				{storeData.data?.map((item) => (
					<MenuItem key={item.id} value={item.id}>
						<Checkbox checked={item.id === storeSelect.id}/>
						<ListItemText primary={item.storeCode}/>
					</MenuItem>
				))}
			</Select>
		</CustomSelectValid>
	);
};
export default memo(StoreSelect);