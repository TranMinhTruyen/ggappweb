import fetchData, { IUseAxiosProps } from 'common/axios/customAxios';
import { CartResponse } from '../../dto/response/CartResponse';

const CartService = {
  async createCartAndAddProductToCart(
    productId: number,
    storeId: number,
    productAmount: number,
    accessToken: string
  ) {
    const props: IUseAxiosProps = {
      url: '/cart/createCartAndAddProductToCart',
      method: 'POST',
      param: {
        productId: productId,
        storeId: storeId,
        productAmount: productAmount,
      },
      header: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    };
    return fetchData<CartResponse>(props);
  },
  async getCartById(accessToken: string) {
    const props: IUseAxiosProps = {
      url: '/cart/getCartById',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    };
    return fetchData<CartResponse>(props);
  },
};
export default CartService;
