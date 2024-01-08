import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './Button';
import { Heading } from './Heading';

type PaymentProps = {};

export const Payment: React.FC<PaymentProps> = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('paystack');

  const handleSavePaymentMethod = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('paymentMethod', JSON.stringify({ paymentMethod }));
    window.location.replace('/checkout?segment=place-order');
  }, []);

  useEffect(() => {
    // Once Page loads prefill info from storage
    const paymentMethodStorage = localStorage.getItem('paymentMethod')
      ? JSON.parse(localStorage.getItem('paymentMethod') || '')
      : null;

    if (paymentMethodStorage) {
      setPaymentMethod(paymentMethodStorage?.paymentMethod);
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSavePaymentMethod} className='max-w-[500px] mx-auto py-6 pb-28'>
        <Heading text='Payment Method' variant='h3' />
        <br />
        <div className='flex gap-4'>
          <label htmlFor='paystack'>Paystack:</label>
          <input
            type='radio'
            name='paymentMethod'
            id='paystack'
            required
            className='border-2 border-slate-400 p-2 rounded-lg'
            value={'paystack'}
            checked={paymentMethod === 'paystack'}
            onChange={(e) => {
              setPaymentMethod(e.target.value);
            }}
          />
        </div>
        <br />
        <div className='flex gap-4'>
          <label htmlFor='paypal'>Paypal:</label>
          <input
            type='radio'
            name='paymentMethod'
            id='paypal'
            className='border-2 border-slate-400 p-2 rounded-lg'
            value={'paypal'}
            checked={paymentMethod === 'paypal'}
            disabled
            onChange={(e) => {
              setPaymentMethod(e.target.value);
            }}
          />
        </div>
        <br />

        <Button>Save</Button>
      </form>
    </div>
  );
};
