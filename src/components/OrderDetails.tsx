import { useStore } from '@nanostores/react';
import React, { useCallback, useEffect } from 'react';
import {
  deliveryRequest,
  errorDelivery,
  errorGetOrder,
  errorPay,
  getOrderDetailsRequest,
  loadingDelivery,
  loadingGetOrder,
  loadingPay,
  orderGetState,
  payRequest,
} from '../state/order';
import type { IPaymentResult } from '../state/order';
import { Heading } from './Heading';
import { Loader } from './Loader';
import { Message } from './Message';
import { PaymentProcessor } from './PaymentProcessor';
import { authState } from '../state/auth';

type OrderDetailsProps = {
  id: string;
};

export const OrderDetails: React.FC<OrderDetailsProps> = ({ id }) => {
  const loadingOrder = useStore(loadingGetOrder);
  const errorOrder = useStore(errorGetOrder);
  const order = useStore(orderGetState);

  const user = useStore(authState);
  const isAdminLoggedIn = Boolean(user.isAdmin);

  const loadingPayment = useStore(loadingPay);
  const errorPayment = useStore(errorPay);

  const loadingDeliver = useStore(loadingDelivery);
  const errorDeliver = useStore(errorDelivery);

  const handleUpdatePaymentStatus = useCallback(
    async (paymentResult: IPaymentResult) => {
      // Make payment here
      payRequest(id, paymentResult).then(() => {
        getOrderDetailsRequest(id);
      });
    },
    [id]
  );

  const handleUpdateDeliveryStatus = useCallback(async () => {
    // Approved delivery status
    deliveryRequest(id).then(() => {
      getOrderDetailsRequest(id);
    });
  }, [id]);

  useEffect(() => {
    getOrderDetailsRequest(id);
  }, []);

  return (
    <section className='max-w-[1000px] mx-auto'>
      {errorOrder && <Message variant='danger'>{errorOrder}</Message>}
      {loadingOrder && <Loader variant='large' />}
      <Heading text={`Order Details: ${order?._id}`} variant='h1' textAlign='center' />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 pb-8'>
        <div>
          <article>
            <Heading text='Shipping' variant='h2' />
            <p className='py-4 text-gray-600'>
              <strong>Name: </strong> {order?.user?.name}
            </p>
            <p className='pb-4 text-gray-600'>
              <strong>Email: </strong> <a href={`mailto:${order?.user?.email}`}>{order?.user?.email}</a>
            </p>
            <p className='pb-4 text-gray-600'>
              <strong>Address:</strong>
              {order?.shippingAddress?.address}, {order?.shippingAddress?.city} {order?.shippingAddress?.postalCode},{' '}
              {order?.shippingAddress?.country}
            </p>
            {order?.isDelivered ? (
              <Message variant='success'>
                <>Delivered on {order?.deliveredAt}</>
              </Message>
            ) : (
              <Message variant='secondary'>Not Delivered</Message>
            )}
          </article>

          <article className='mt-8'>
            <Heading text='Payment Method' variant='h2' />
            <p className='capitalize'>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant='success'>
                <>Paid on {order.paidAt}</>
              </Message>
            ) : (
              <Message variant='secondary'>Not Paid</Message>
            )}
          </article>

          <article className='mt-8'>
            {!order?.orderItems?.length && <Message variant='danger'>You have no order items</Message>}

            <div className='flex flex-col'>
              {!order?.orderItems?.length && <Message variant='danger'>You have no order items</Message>}

              {order?.orderItems?.map((orderItem, index) => {
                return (
                  <div key={`${orderItem?.name}${index}`} className='flex gap-6 items-end'>
                    <div style={{ width: '100px', height: '100px' }}>
                      <img src={orderItem?.image} alt={orderItem?.name} className='w-full h-full object-cover' />
                    </div>
                    <div>
                      <a href={`/product/${orderItem?.product}`}>{orderItem?.name}</a>
                    </div>

                    <div>
                      <p>
                        {orderItem?.qty} x ${orderItem.price} = ${orderItem?.qty * orderItem?.price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </div>

        <div>
          <article>
            <Heading text='Order Summary' variant='h2' />
            <div className='max-w-[300px] border-2 mt-4'>
              <div className='p-4 text-gray-600 flex justify-between items-center border-b-2'>
                <p>Items Price:</p>
                <p>${order?.itemsPrice}</p>
              </div>
              <div className='p-4 text-gray-600  flex justify-between items-center  border-b-2'>
                <p>Shipping fee:</p>
                <p>${order?.shippingPrice}</p>
              </div>
              <div className='p-4 text-gray-600 flex justify-between items-center  border-b-2'>
                <p>Tax:</p>
                <p>${order?.taxPrice}</p>
              </div>
              <div className='p-4 text-gray-600 flex justify-between items-center  border-b-2'>
                <p>Total Price</p>
                <p>${order?.totalPrice}</p>
              </div>
              {errorPayment && <Message variant='danger'>{errorPayment}</Message>}
              {loadingPayment && <Loader variant='small' />}
              <div className='p-4 text-gray-600 flex justify-between items-center  border-b-2'>
                {order?.isPaid ? <p>Payment Status:</p> : null}
                <p className={!order?.isPaid ? 'flex-1' : ''}>
                  {order?.isPaid ? (
                    'Paid'
                  ) : (
                    <PaymentProcessor amount={order?.totalPrice} onPlaceOrder={handleUpdatePaymentStatus} />
                  )}
                </p>
              </div>
              {errorDeliver && <Message variant='danger'>{errorDeliver}</Message>}
              {loadingDeliver && <Loader variant='small' />}
              {isAdminLoggedIn && (
                <div className='p-4 text-gray-600 flex justify-between items-center  border-b-2'>
                  {order?.isDelivered ? <p>Delivery Status:</p> : null}
                  <p className={!order?.isDelivered ? 'flex-1' : ''}>
                    {order?.isDelivered ? (
                      'Delivered'
                    ) : (
                      <button
                        onClick={handleUpdateDeliveryStatus}
                        className='bg-slate-900 text-white rounded-2xl px-5 py-2 text-lg md:text-xl font-medium w-full  flex gap-3 justify-center cursor-pointer hover:bg-slate-800'
                        disabled={!order?.isPaid || order?.isDelivered}
                      >
                        Mark As Delivered
                      </button>
                    )}
                  </p>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
