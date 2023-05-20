import React, { memo } from 'react';
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import placeHolderImage from '../../static/placeholder-image.png';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2';
import CommonButton from '../../components/CommonButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ProductStoreResponse } from '../../common/dto/response/ProductStoreResponse';

interface IProductCard {
	product: ProductStoreResponse;
	handleAddToCart: (productId: number) => void;
	handleBuyNow: () => void;
}

const ProductCard = (props: IProductCard) => {
	const { product, handleBuyNow, handleAddToCart } = props;
	
	return (
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
						Price: {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
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
							label={'Add to cart'}
						/>
					</Grid2>
					<Grid2 xs={6} display="flex" justifyContent="center" alignItems="center">
						<CommonButton
							width={200}
							startIcon={<ShoppingCartIcon/>}
							variant="contained"
							onClick={handleBuyNow}
							label={'Buy now'}
						/>
					</Grid2>
				</Grid2>
			</Box>
		</Card>
	);
};
export default memo(ProductCard);