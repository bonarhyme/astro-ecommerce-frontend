import React from 'react';

type LoaderProps = {
  variant?: 'small' | 'large';
};

export const Loader: React.FC<LoaderProps> = ({ variant }) => {
  if (variant === 'small') {
    return (
      <div className='flex items-center justify-center'>
        <div className='animate-spin rounded-full h-6 w-6 border-t-4 border-blue-500 border-solid'></div>
      </div>
    );
  }
  return (
    <div className='flex items-center justify-center'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid'></div>
    </div>
  );
};
