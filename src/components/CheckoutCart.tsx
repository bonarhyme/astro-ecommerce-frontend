import React from 'react';
import { Payment } from './Payment';
import { PlaceOrder } from './PlaceOrder';
import { Shipping } from './Shipping';

type CheckoutCartProps = {
  segment: string;
};

export const CheckoutCart: React.FC<CheckoutCartProps> = ({ segment }) => {
  return (
    <section className='px-4 '>
      <div className='flex justify-center gap-6 mb-8'>
        <a href='/checkout?segment=shipping' className={segment !== 'shipping' ? 'text-gray-500' : 'text-gray-800'}>
          Shipping
        </a>

        <a href='/checkout?segment=payment' className={segment !== 'payment' ? 'text-gray-500' : 'text-gray-800'}>
          Payment
        </a>

        <a
          href='/checkout?segment=place-order'
          className={segment !== 'place-order' ? 'text-gray-500' : 'text-gray-800'}
        >
          Place Order
        </a>
      </div>

      <div>
        {segment === 'shipping' && <Shipping />}
        {segment === 'payment' && <Payment />}
        {segment === 'place-order' && <PlaceOrder />}
      </div>
    </section>
  );
};
