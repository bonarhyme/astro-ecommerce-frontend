import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './Button';
import { Heading } from './Heading';

type ShippingProps = {};

export const Shipping: React.FC<ShippingProps> = () => {
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const handleSaveShippingAddress = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      localStorage.setItem('shippingAddress', JSON.stringify({ address, city, postalCode, country }));
      window.location.replace('/checkout?segment=payment');
    },
    [address, city, postalCode, country]
  );

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
  }, []);

  return (
    <div>
      <form onSubmit={handleSaveShippingAddress} className='max-w-[500px] mx-auto py-6 pb-28'>
        <Heading text='Shipping Address' variant='h3' />
        <br />

        <div>
          <label htmlFor='address'>Address:</label>
          <input
            type='text'
            name='address'
            id='address'
            required
            placeholder='Enter address'
            className='border-2 border-slate-400 p-2 rounded-lg w-full'
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <br />

        <div>
          <label htmlFor='city'>City:</label>
          <input
            type='text'
            name='city'
            id='city'
            required
            placeholder='Enter city'
            className='border-2 border-slate-400 p-2 rounded-lg w-full'
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </div>
        <br />

        <div>
          <label htmlFor='postalCode'>Postal Code</label>
          <input
            type='text'
            name='postalCode'
            id='postalCode'
            required
            placeholder='Enter postal Code'
            className='border-2 border-slate-400 p-2 rounded-lg w-full'
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor='country'>Country</label>
          <input
            type='text'
            name='country'
            id='country'
            required
            placeholder='Enter country'
            className='border-2 border-slate-400 p-2 rounded-lg w-full'
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
        </div>
        <br />

        <Button>Save</Button>
      </form>
    </div>
  );
};
