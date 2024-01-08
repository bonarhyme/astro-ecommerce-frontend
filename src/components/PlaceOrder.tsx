import { useStore } from '@nanostores/react';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { cart } from '../state/cart';
import type { ICartItem } from '../state/cart';
import { Button } from './Button';
import { errorPlaceOrder, loadingPlaceOrder, placeOrderRequest } from '../state/order';
import { Loader } from './Loader';
import { Message } from './Message';

const formatWithDecimals = (value: number) => {
  return (Math.round(value * 100) / 100).toFixed(2);
};

type PlaceOrderProps = {};

export const PlaceOrder: React.FC<PlaceOrderProps> = () => {
  const cartItems = useStore(cart);

  const loading = useStore(loadingPlaceOrder);
  const error = useStore(errorPlaceOrder);

  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('paystack');

  const priceSummation = useMemo(() => {
    const itemsPrice = formatWithDecimals(
      (cartItems || [])?.reduce((cummulation, item) => cummulation + item.price * item.qty, 0)
    );

    // Calculate shipping fee
    const shippingFee = 50;

    // calculate tax fee
    const taxFee = 0;

    const totalPrice = formatWithDecimals(Number(itemsPrice) + Number(shippingFee) + Number(taxFee));

    return {
      itemsPrice,
      shippingFee,
      taxFee,
      totalPrice,
    };
  }, [cartItems]);

  const handlePlaceOrder = useCallback(async () => {
    if (!address || !city || !postalCode || !country || !paymentMethod) {
      return;
    }
    const shippingAddress = { address, city, postalCode, country };
    await placeOrderRequest(
      cartItems || [],
      shippingAddress,
      paymentMethod,
      Number(priceSummation?.itemsPrice),
      priceSummation?.taxFee,
      Number(priceSummation?.totalPrice),
      priceSummation?.shippingFee
    );
  }, [address, city, postalCode, country, paymentMethod, priceSummation, cartItems]);

  useEffect(() => {
    // Once Page loads prefill info from storage
    const shippingStorage = localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress') || '')
      : null;

    if (shippingStorage) {
      setAddress(shippingStorage?.address);
      setCity(shippingStorage?.city);
      setPostalCode(shippingStorage?.postalCode);
      setCountry(shippingStorage?.country);
    }

    // Once Page loads prefill info from storage
    const paymentMethodStorage = localStorage.getItem('paymentMethod')
      ? JSON.parse(localStorage.getItem('paymentMethod') || '')
      : null;

    if (paymentMethodStorage) {
      setPaymentMethod(paymentMethodStorage?.paymentMethod);
    }
  }, []);

  return (
    <div className='max-w-[900px] mx-auto py-6 pb-28'>
      {loading && <Loader variant='large' />}
      {error && <Message variant='danger'>{error}</Message>}
      <div className='flex gap-6 justify-center'>
        <div className='w-full max-w-[500px] flex-1'>
          <div className='border-b-2 p-4'>
            <h2 className='text-xl md:text-2xl  pt-6 pb-2 mx-auto uppercase text-gray-700'>Shipping Address </h2>
            <p className='text-gray-600'>
              {address}, {postalCode}, {city}, {country}.
            </p>
          </div>
          <div className='border-b-2 p-4'>
            <h2 className='text-xl md:text-2xl  pt-6 pb-2 mx-auto uppercase text-gray-700'>Payment Method </h2>
            <p className='text-gray-600 capitalize'>{paymentMethod}</p>
          </div>
          <div className='border-b-2 p-4'>
            <h2 className='text-xl md:text-2xl  pt-6 pb-2 mx-auto uppercase text-gray-700'>Order Items </h2>

            {cartItems?.map((cartItem, index) => (
              <PlaceOrderItem cartItem={cartItem} key={`${cartItem?.name}${index}`} />
            ))}
          </div>
        </div>

        <div className='w-[400px] py-6'>
          <div className='  text-gray-700'>
            <h2 className='text-xl md:text-2xl border-2   pb-2 mx-auto uppercase text-gray-700  p-4'>Order Summary</h2>
          </div>
          <div className='border-2 border-t-0 flex justify-between text-gray-600 p-2 py-4'>
            <p>Items Price:</p>
            <p className='text-left'>${priceSummation?.itemsPrice}</p>
          </div>
          <div className='border-2 border-t-0 flex justify-between text-gray-600 p-2 py-4'>
            <p>Shipping fee:</p>
            <p className='text-left'>${priceSummation?.shippingFee}</p>
          </div>
          <div className='border-2 border-t-0 flex justify-between text-gray-600 p-2 py-4'>
            <p>Tax fee:</p>
            <p className='text-left'>${priceSummation?.taxFee}</p>
          </div>
          <div className='border-2 border-t-0 flex justify-between text-gray-600 p-2 py-4'>
            <p>Total fee:</p>
            <p className='text-left'>${priceSummation?.totalPrice}</p>
          </div>
          <div className='text-sm flex gap-4   mx-auto border-2 border-t-0 px-4 pb-3 justify-center'>
            <Button
              size='small'
              type='button'
              disabled={!address || !city || !postalCode || !country || !paymentMethod || loading}
              onClick={handlePlaceOrder}
            >
              Place Order {loading && <Loader variant='small' />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

type PlaceOrderItemProps = {
  cartItem: ICartItem;
};

const PlaceOrderItem: React.FC<PlaceOrderItemProps> = ({ cartItem }) => {
  return (
    <div className='text-gray-600 flex justify-between mb-4 items-end'>
      <div>
        <div style={{ width: '50px' }}>
          <img src={cartItem?.image} className='w-full h-full object-cover' />
        </div>
      </div>

      <div>
        <p>{cartItem?.name}</p>
      </div>

      <div>
        {cartItem?.qty} x ${cartItem?.price} = ${cartItem?.qty * cartItem?.price}
      </div>
    </div>
  );
};
