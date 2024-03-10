import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface CartState {
    amountInCart: number;
}

const initialState: CartState = {
    amountInCart: 0,
};

export const cartSlice = createSlice({
    name: 'cartState',
    initialState,
    reducers: {
        setAmountInCart: (state, action: PayloadAction<number>) => {
            const { payload } = action;
            return {
                ...state,
                amountInCart: payload,
            };
        },
        resetAmountInCart: () => {
            return initialState;
        },
    },
});

export const { setAmountInCart, resetAmountInCart } = cartSlice.actions;

export const selectAmountInCart = (state: RootState) => state.cartState.amountInCart;

export default cartSlice.reducer;
