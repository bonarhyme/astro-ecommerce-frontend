import React from 'react';

type HeadingProps = {
  text: string;
  variant?: 'h1' | 'h2' | 'h3';
  textAlign?: 'center' | 'left' | 'right';
};

export const Heading: React.FC<HeadingProps> = ({ text, variant = 'h1', textAlign = 'left' }) => {
  return (
    <>
      {variant === 'h1' && (
        <h1 className='text-xl md:text-3xl font-bold py-6 mx-auto' style={{ textAlign }}>
          {text}
        </h1>
      )}
      {variant === 'h2' && (
        <h2 className='text-lg md:text-2xl font-bold mx-auto' style={{ textAlign }}>
          {text}
        </h2>
      )}
      {variant === 'h3' && (
        <h3 className='text-lg md:text-xl mx-auto' style={{ textAlign }}>
          {text}
        </h3>
      )}
    </>
  );
};
