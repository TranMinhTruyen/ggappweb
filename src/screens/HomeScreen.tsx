import React, {memo, useEffect, useState} from "react";
import StoreApi from "../common/api/StoreApi";
import {ProductStoreResponse} from "../common/dto/response/ProductStoreResponse";
import {Card, CardActionArea, CardContent, CardMedia, TablePagination} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
import placeHolderImage from "../static/placeholder-image.png";
import CommonButton from "../components/CommonButton";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {setOpenLoginModal} from "../redux/slices/commonSlice";
import CartApi from "../common/api/CartApi";
import {selectToken} from "../redux/slices/tokenSlice";
import {shallowEqual} from "react-redux";
import {RootState} from "../redux/store";
import Box from "@mui/material/Box";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {selectStore} from "../redux/slices/storeSlice";

const HomeScreen = () => {
	const [productList, setProductList] = useState<ProductStoreResponse[]>([])
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

	useEffect(() => {
		async function getProductFromStore() {
			const responseData = await StoreApi.getProductFromStore(rowsPerPage, page, storeState.id);
			if (responseData.status === 200) {
				setCount(responseData.payload.totalRecord);
				setProductList(responseData.payload.data);
			}
		}
		getProductFromStore().then(() => {});
	}, [storeState, page, rowsPerPage])
	
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
			const response = await CartApi.createCartAndAddProductToCart(productId, storeState.id, 1, userToken.accessToken);
			if (response.status === 200) {
				console.log(response);
			}
		} else {
			dispatch(setOpenLoginModal(true));
		}
	}

	const handleBuyNow = () => {
		if (isLogin) {

		} else {
			dispatch(setOpenLoginModal(true));
		}
	}

	return (
		<Box>
			<Grid2 container spacing={2.5}>
				{productList.map((product) => (
					<Grid2 key={product.id} xs={4}>
						<Card>
							<CardActionArea>
								{
									product.image !== null && product.image.length > 0 ?
										<CardMedia
											component="img"
											alt={product.name}
											height="300"
											image={`data:image/png;base64,${product.image[0].imageData}`}
										/> :
										<CardMedia
											component="img"
											alt="example"
											height="140"
											image={placeHolderImage}
										/>
								}
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{product.name}
									</Typography>
									<Typography gutterBottom variant="body2" component="div">
										Brand: {product.brand}
									</Typography>
									<Typography variant="body2" color={'#ff0000'}>
										Price: {product.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
									</Typography>
								</CardContent>
							</CardActionArea>
							<Box padding={1}>
								<Grid2 container>
									<Grid2 xs={6} display="flex" justifyContent="center" alignItems="center">
										<CommonButton
											width={200}
											startIcon={<AddShoppingCartIcon/>}
											variant="contained" onClick={() => handleAddToCart(product.id)}
											label={"Add to cart"}
										/>
									</Grid2>
									<Grid2 xs={6} display="flex" justifyContent="center" alignItems="center">
										<CommonButton
											width={200}
											startIcon={<ShoppingCartIcon/>}
											variant="contained"
											onClick={handleBuyNow}
											label={"Buy now"}
										/>
									</Grid2>
								</Grid2>
							</Box>
						</Card>
					</Grid2>
				))}
			</Grid2>
			<TablePagination
				component="div"
				count={count}
				page={page - 1}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Box>
	)
}
export default memo(HomeScreen);
