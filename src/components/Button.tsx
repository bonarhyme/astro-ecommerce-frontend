import React from 'react';
import { Loader } from './Loader';

type ButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  size?: 'small' | 'large';
  onClick?(): void;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  size = 'large',
  onClick,
  type = 'submit',
  disabled,
}) => {
  if (size === 'small') {
    return (
      <button
        className='bg-slate-900 text-white rounded-2xl px-5 py-2 text-lg md:text-xl font-medium w-full max-w-[250px] flex gap-3 justify-center mt-8 cursor-pointer hover:bg-slate-800'
        disabled={loading || disabled}
        onClick={onClick}
        type={type}
      >
        {children} {loading && <Loader variant='small' />}
      </button>
    );
  }

  return (
    <button
      className='bg-slate-900 text-white rounded-2xl px-5 py-2 text-lg md:text-xl font-medium w-full max-w-[500px] mx-auto flex gap-3 justify-center mt-8 cursor-pointer hover:bg-slate-800'
      disabled={loading || disabled}
      onClick={onClick}
      type={type}
    >
      {children} {loading && <Loader variant='small' />}
    </button>
  );
};
