import { ProductStoreResponse } from 'common/dto/response/ProductStoreResponse';
import { selectAccessToken, selectIsLogin } from 'common/sevices/auth/authSlice';
import CartService from 'common/sevices/cart/cartService';
import { setAmountInCart } from 'common/sevices/cart/cartSlice';
import { toggleLoginDialog } from 'common/sevices/login/loginSlice';
import { selectAlertInfoHeight } from 'common/sevices/main/mainSlice';
import StoreService from 'common/sevices/store/storeService';
import { selectStoreId } from 'common/sevices/store/storeSlice';
import React, { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store';
import ProductCard from './ProductCard';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import TablePagination from '@mui/material/TablePagination/TablePagination';

const HomeScreen = () => {
    const [productList, setProductList] = useState<ProductStoreResponse[]>([]);
    const [page, setPage] = useState<number>(1);
    const [count, setCount] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const storeId = useAppSelector(selectStoreId);
    const accessToken = useAppSelector(selectAccessToken);
    const isLogin = useAppSelector(selectIsLogin);
    const alertInfoHeight = useAppSelector(selectAlertInfoHeight);
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function getProductFromStore() {
            const responseData = await StoreService.getProductFromStore(
                rowsPerPage,
                page,
                storeId as number
            );
            if (responseData.status === 200) {
                setCount(responseData.payload.totalRecord);
                setProductList(responseData.payload.data);
            }
        }

        getProductFromStore().then(() => {});
    }, [storeId, page, rowsPerPage]);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const handleAddToCart = async (productId: number) => {
        if (isLogin && accessToken !== null) {
            const response = await CartService.createCartAndAddProductToCart(
                productId,
                storeId as number,
                1,
                accessToken
            );
            if (response.status === 200) {
                dispatch(setAmountInCart(response.payload.amountInCart));
            }
        } else {
            dispatch(toggleLoginDialog());
        }
    };

    const handleBuyNow = () => {
        if (isLogin) {
        } else {
            dispatch(toggleLoginDialog());
        }
    };

    return (
        <Box>
            <Box
                overflow={'hidden'}
                sx={{
                    height: `calc(86vh - ${alertInfoHeight}px)`,
                    maxHeight: `calc(86vh - ${alertInfoHeight}px)`,
                    overflowY: 'scroll',
                }}
            >
                <Grid2 container spacing={2.5}>
                    {productList.map(product => (
                        <Grid2 key={product.id} xs={4}>
                            <ProductCard
                                product={product}
                                handleAddToCart={handleAddToCart}
                                handleBuyNow={handleBuyNow}
                            />
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
