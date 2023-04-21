import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import {useAppSelector} from "../redux/hooks";
import {selectStore, setStore} from "../redux/slices/storeSlice";
import {useEffect, useState} from "react";
import StoreApi from "../common/api/StoreApi";
import {ProductStoreResponse} from "../common/dto/response/ProductStoreResponse";

const HomeScreen = () => {
	const storeSlice = useAppSelector(selectStore);

	const [productList, setProductList] = useState<ProductStoreResponse[]>([])

	useEffect(() => {
		async function getProductFromStore() {
			const responseData = await StoreApi.getProductFromStore(5, 1, storeSlice.id);
			if (responseData.status === 200) {
				setProductList(responseData.payload.data);
			}
		}
		getProductFromStore().then(() => {});
	}, [storeSlice])


	return (
		<Box>
			<Typography>Home</Typography>
			<Typography>Hello world</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="left">Product name</TableCell>
							<TableCell align="right">Brand</TableCell>
							<TableCell align="right">Category</TableCell>
							<TableCell align="right">Price</TableCell>
							<TableCell align="right">Discount</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{productList.map((item) => (
							<TableRow
								key={item.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{item.name}
								</TableCell>
								<TableCell align="right">{item.brand}</TableCell>
								<TableCell align="right">{item.category}</TableCell>
								<TableCell align="right">{item.price}</TableCell>
								<TableCell align="right">{item.discount}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default HomeScreen;
