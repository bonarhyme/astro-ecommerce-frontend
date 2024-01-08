import { useStore } from '@nanostores/react';
import React, { useCallback, useEffect, useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { authState } from '../state/auth';
import type { IPaymentResult } from '../state/order';

type PaymentResponseType = {
  reference: string;
  trans: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
  redirecturl: string;
};

type PaymentProcessorProps = {
  amount: number;
  onPlaceOrder(paymentResult: IPaymentResult): void;
};

export const PaymentProcessor: React.FC<PaymentProcessorProps> = ({ amount, onPlaceOrder }) => {
  const user = useStore(authState);

  const [paymentMethod, setPaymentMethod] = useState<string>('paystack');

  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_test',
  };

  // you can call this function anything
  const handlePaystackSuccessAction = useCallback((reference: PaymentResponseType) => {
    // Place order here
    onPlaceOrder({
      message: reference?.message,
      reference: reference?.reference,
      status: reference?.status,
      transactionId: reference?.transaction,
    });
  }, []);

  const handleMockSuccessAction = useCallback(() => {
    // Place order here
    onPlaceOrder({
      message: 'Approved',
      reference: 'Mock-1234',
      status: 'success',
      transactionId: 'Mock-1234',
    });
  }, []);

  // you can call this function anything
  const handlePaystackCloseAction = useCallback(() => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed');
  }, []);

  const componentProps = {
    ...config,
    text: 'Make Payment',
    onSuccess: (reference: PaymentResponseType) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

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
      {/* {paymentMethod === 'paystack' && (
        <PaystackButton
          {...componentProps}
          className='bg-slate-900 text-white rounded-2xl px-5 py-2 text-lg md:text-xl font-medium w-full  flex gap-3 justify-center cursor-pointer hover:bg-slate-800'
        />
      )} */}
      {/* USe this to mock payment */}
      {paymentMethod === 'paystack' && (
        <button
          onClick={handleMockSuccessAction}
          className='bg-slate-900 text-white rounded-2xl px-5 py-2 text-lg md:text-xl font-medium w-full  flex gap-3 justify-center cursor-pointer hover:bg-slate-800'
        >
          Make payment
        </button>
      )}
    </div>
  );
};
