import React from 'react';
import { type IProduct } from '../state/products';
import { Rating } from './Rating';

type ProductProps = {
  product: IProduct;
};

export const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <article className='my-3 p-3 rounded border w-[300px] bg-gray-100'>
      <a href={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className='w-full h-[350px] object-cover' />
      </a>
      <div className='p-3'>
        <a href={`/product/${product._id}`} className='text-lg font-semibold text-blue-500 hover:underline'>
          {product.name}
        </a>
        <div className='text-gray-500'>
          <Rating value={product?.rating} text={`${product?.numReviews} reviews`} />
        </div>
        <h3 className='text-2xl font-bold text-green-600'>${product.price}</h3>
      </div>
    </article>
  );
};
