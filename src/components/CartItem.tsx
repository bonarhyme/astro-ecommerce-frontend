import React, { useCallback, useState } from 'react';
import { addToCart, removeFromCart } from '../state/cart';
import type { ICartItem } from '../state/cart';
import Select from './Select';
import { FaTrash } from 'react-icons/fa';

export const CartItem: React.FC<ICartItem> = ({ image, name, price, product, qty, countInStock }) => {
  const [quantity, setQuantity] = useState<number | string>(qty);

  const handleCartQuantityUpdate = useCallback(async (quantity: string) => {
    await addToCart(product, Number(quantity));
  }, []);

  const handleRemoveFromCart = useCallback(async () => {
    await removeFromCart(product);
  }, []);

  return (
    <div className=' w-full max-w-[600px] border-4 mb-6 mx-auto p-4 bg-slate-50'>
      <article className='flex gap-6 items-center  w-full  flex-col md:flex-row'>
        <div>
          <div className='w-[100px] h-[100px] '>
            <img src={image} className='w-[100px] h-[100px] object-cover' />
          </div>
        </div>
        <div className='whitespace-nowrap'>
          <p>{name}</p>
        </div>
        <div>
          <p>${price}</p>
        </div>

        <div className='w-full min-w-[120px] mx-auto flex justify-center'>
          <Select
            length={countInStock}
            onChange={(e) => {
              handleCartQuantityUpdate(e.target.value);
              setQuantity(e.target.value);
            }}
            value={quantity.toString()}
            maxWidth={'120px'}
          />
        </div>
        <div>
          <FaTrash className='text-gray-700 cursor-pointer' size={20} onClick={handleRemoveFromCart} />
        </div>
      </article>
    </div>
  );
};
