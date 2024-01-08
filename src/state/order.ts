import { SERVER_URL } from './auth';
import { atom, map } from 'nanostores';

import axios from 'axios';
import type { ICartItem } from './cart';

export interface OrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: any;
}

export interface IOrder {
  _id: string;
  user: any;
  orderItems: Array<OrderItem>;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult: {
    message: string;
    reference: string;
    status: string;
    transactionId: string;
    user: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date | number;
  isDelivered: boolean;
  deliveredAt: Date | number;
}

export interface IPaymentResult {
  message: string;
  reference: string;
  status: string;
  transactionId: string;
}

export const loadingPlaceOrder = atom<boolean>(false);
export const errorPlaceOrder = atom<string | undefined>(undefined);

export const loadingGetOrder = atom<boolean>(false);
export const errorGetOrder = atom<string | undefined>(undefined);
export const orderGetState = map<IOrder>();

export const loadingPay = atom<boolean>(false);
export const errorPay = atom<string | undefined>(undefined);
export const payState = map();

export const loadingDelivery = atom<boolean>(false);
export const errorDelivery = atom<string | undefined>(undefined);

export const loadingOrderList = atom<boolean>(false);
export const errorOrderList = atom<string | undefined>(undefined);
export const orderListState = atom<Array<IOrder>>([]);

export const loadingMyOrderList = atom<boolean>(false);
export const errorMyOrderList = atom<string | undefined>(undefined);
export const myOrderListState = atom<Array<IOrder>>([]);

export const placeOrderRequest = async (
  orderItems: ICartItem[],
  shippingAddress: IOrder['shippingAddress'],
  paymentMethod: IOrder['paymentMethod'],
  itemsPrice: IOrder['itemsPrice'],
  taxPrice: IOrder['taxPrice'],
  totalPrice: IOrder['totalPrice'],
  shippingPrice: IOrder['shippingPrice']
) => {
  errorPlaceOrder.set(undefined);
  loadingPlaceOrder.set(true);
  try {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const response = await axios.post<IOrder>(
      `${SERVER_URL}/api/orders`,
      {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
        shippingPrice,
      },
      config
    );

    localStorage.removeItem('cart');
    window.location.href = `/order/${response?.data?._id}`;
  } catch (error: any) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    errorPlaceOrder.set(message);
  } finally {
    loadingPlaceOrder.set(false);
  }
};

export const getOrderDetailsRequest = async (id: string) => {
  errorGetOrder.set(undefined);
  loadingGetOrder.set(true);
  try {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const response = await axios.get<IOrder>(`${SERVER_URL}/api/orders/${id}`, config);

    orderGetState.set(response.data);
  } catch (error: any) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    errorGetOrder.set(message);
  } finally {
    loadingGetOrder.set(false);
  }
};

export const payRequest = async (id: string, paymentResult: IPaymentResult) => {
  errorPay.set(undefined);
  loadingPay.set(true);
  try {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const response = await axios.put(`${SERVER_URL}/api/orders/${id}/pay`, paymentResult, config);

    console.log({ response });
  } catch (error: any) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    errorPay.set(message);
  } finally {
    loadingPay.set(false);
  }
};

export const deliveryRequest = async (id: string) => {
  errorDelivery.set(undefined);
  loadingDelivery.set(true);
  try {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const response = await axios.put(`${SERVER_URL}/api/orders/${id}/deliver`, {}, config);

    console.log({ response });
  } catch (error: any) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    errorDelivery.set(message);
  } finally {
    loadingDelivery.set(false);
  }
};

export const listOrdersRequest = async () => {
  errorOrderList.set(undefined);
  loadingOrderList.set(true);
  try {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const response = await axios.get<Array<IOrder>>(`${SERVER_URL}/api/orders`, config);

    console.log({ hhh: response });
    orderListState.set(response.data);
  } catch (error: any) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    errorOrderList.set(message);
  } finally {
    loadingOrderList.set(false);
  }
};

export const listMyOrdersRequest = async () => {
  errorMyOrderList.set(undefined);
  loadingMyOrderList.set(true);
  try {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const response = await axios.get<Array<IOrder>>(`${SERVER_URL}/api/orders/myorders`, config);

    console.log({ hhh: response });
    myOrderListState.set(response.data);
  } catch (error: any) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    errorMyOrderList.set(message);
  } finally {
    loadingMyOrderList.set(false);
  }
};
