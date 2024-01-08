import { useStore } from '@nanostores/react';
import React, { useCallback, useEffect } from 'react';
import { FaCartPlus, FaSignOutAlt, FaUser, FaUsers } from 'react-icons/fa';
import { FaTableList } from 'react-icons/fa6';

import { authInitialState, authState } from '../state/auth';
import { cart } from '../state/cart';

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => {
  const user = useStore(authState);
  const isLoggedIn = Boolean(user.token);
  const isAdminLoggedIn = Boolean(user.isAdmin);

  const cartItems = useStore(cart);

  const handleLogout = useCallback(() => {
    authState.set(authInitialState);
    if (window) {
      localStorage.removeItem('user');
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    // Set initial auth state data from storage
    const authStateStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;

    if (authStateStorage) {
      authState.set(authStateStorage);
    }

    // Set initial cart items if it exists
    const cartStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '') : null;

    if (cartStorage) {
      cart.set(cartStorage);
    }
  }, []);

  return (
    <nav className='p-3 bg-slate-100'>
      <div className='max-w-[1800px] mx-auto flex items-end justify-between'>
        <div>
          <a href='/'>
            <img
              src={'/astro.png'}
              width='150'
              height='50'
              alt='Astro ecommerce'
              style={{ objectFit: 'cover' }}
              className='w-[80px] md:w-[100px]'
            />
          </a>
        </div>
        <ul className='flex gap-4'>
          <li>
            <a href='/cart' className='flex items-center gap-1'>
              <span className='relative'>
                <FaCartPlus size={20} />{' '}
                {cartItems?.length && (
                  <span className='absolute -right-1 -top-1 rounded-full bg-red-600 w-4 h-4  right text-white font-mono text-[10px]  leading-tight text-center flex justify-center items-center'>
                    {cartItems?.length}
                  </span>
                )}{' '}
              </span>
              Cart
            </a>
          </li>
          {isLoggedIn && (
            <li>
              <a href='/account' className='flex items-center gap-1'>
                <FaUser size={20} /> Account
              </a>
            </li>
          )}
          {isAdminLoggedIn && (
            <>
              <li>
                <a href='/manage-products' className='flex items-center gap-1'>
                  <FaTableList size={20} /> Products
                </a>
              </li>
              <li>
                <a href='/manage-orders' className='flex items-center gap-1'>
                  <FaTableList size={20} /> Orders
                </a>
              </li>
              <li>
                <a href='/manage-users' className='flex items-center gap-1'>
                  <FaUsers size={20} /> Users
                </a>
              </li>
            </>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={handleLogout} className='flex items-center gap-1 text-red-500'>
                <FaSignOutAlt size={20} /> Logout
              </button>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <a href='/login' className='flex items-center gap-1'>
                <FaUser size={20} /> Login
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
