import Box from "@mui/material/Box";
import {useAppSelector} from "../redux/hooks";
import {selectStore} from "../redux/slices/storeSlice";
import React, {memo, useEffect, useState} from "react";
import StoreApi from "../common/api/StoreApi";
import {ProductStoreResponse} from "../common/dto/response/ProductStoreResponse";
import {Card, CardActionArea, CardContent, CardMedia, TablePagination} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
import placeHolderImage from "../static/placeholder-image.png";

const HomeScreen = () => {
	const storeSlice = useAppSelector(selectStore);

	const [productList, setProductList] = useState<ProductStoreResponse[]>([])
	const [page, setPage] = useState<number>(1);
	const [count, setCount] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);

	useEffect(() => {
		async function getProductFromStore() {
			const responseData = await StoreApi.getProductFromStore(rowsPerPage, page, storeSlice.id);
			if (responseData.status === 200) {
				setCount(responseData.payload.totalRecord);
				setProductList(responseData.payload.data);
			}
		}
		getProductFromStore().then(() => {});
	}, [storeSlice, page, rowsPerPage])
	
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

	return (
		<Box>
			<Grid2 container spacing={2.5}>
				{productList.map((product) => (
					<Grid2 key={product.id} xs={12} md={3}>
						<Card>
							<CardActionArea>
								{
									product.image !== null && product.image.length > 0 ?
										<CardMedia
											component="img"
											alt="example"
											height="140"
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
