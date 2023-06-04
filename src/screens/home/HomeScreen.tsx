import React, { memo, useEffect, useState } from 'react';
import StoreService from '../../common/sevices/store/storeService';
import { ProductStoreResponse } from '../../common/dto/response/ProductStoreResponse';
import Grid2 from '@mui/material/Unstable_Grid2';
import { setOpenLoginModal } from '../../redux/slices/commonSlice';
import CartService from '../../common/sevices/cart/cartService';
import { selectToken } from '../../redux/slices/tokenSlice';
import { shallowEqual } from 'react-redux';
import { RootState } from '../../redux/store';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectStore } from '../../redux/slices/productSlice';
import ProductCard from './ProductCard';
import { TablePagination } from '@mui/material';

const HomeScreen = () => {
	const [productList, setProductList] = useState<ProductStoreResponse[]>([]);
	const [page, setPage] = useState<number>(1);
	const [count, setCount] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);
	const storeState = useAppSelector(selectStore, shallowEqual);
	const userToken = useAppSelector(selectToken, shallowEqual);
	const dispatch = useAppDispatch();
	const { isLogin } = useAppSelector(
		(state: RootState) => ({ isLogin: state.commonState.isLogin }),
		shallowEqual
	);
	
	const { alertInfoHeight } = useAppSelector((state: RootState) =>
			({ alertInfoHeight: state.commonState.alertInfoHeight }),
		shallowEqual
	);
	
	
	useEffect(() => {
		async function getProductFromStore() {
			const responseData = await StoreService.getProductFromStore(rowsPerPage, page, storeState.id);
			if (responseData.status === 200) {
				setCount(responseData.payload.totalRecord);
				setProductList(responseData.payload.data);
			}
		}
		
		getProductFromStore().then(() => {
		});
	}, [storeState, page, rowsPerPage]);
	
	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage + 1);
	};
	
	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(1);
	};
	
	const handleAddToCart = async (productId: number) => {
		if (isLogin && userToken.accessToken !== null) {
			const response = await CartService.createCartAndAddProductToCart(productId, storeState.id, 1, userToken.accessToken);
			if (response.status === 200) {
				console.log(response);
			}
		} else {
			dispatch(setOpenLoginModal(true));
		}
	};
	
	const handleBuyNow = () => {
		if (isLogin) {
		
		} else {
			dispatch(setOpenLoginModal(true));
		}
	};
	
	return (
		<Box>
			<Box
				overflow={'hidden'}
				sx={{
					height: `calc(86vh - ${alertInfoHeight}px)`,
					maxHeight: `calc(86vh - ${alertInfoHeight}px)`,
					overflowY: 'scroll'
				}}
			>
				<Grid2 container spacing={2.5}>
					{productList.map((product) => (
						<Grid2 key={product.id} xs={4}>
							<ProductCard product={product} handleAddToCart={handleAddToCart} handleBuyNow={handleBuyNow}/>
						</Grid2>
					))}
				</Grid2>
			</Box>
			<TablePagination
				component="div"
				count={count}
				page={page - 1}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Box>
	);
};
export default memo(HomeScreen);
