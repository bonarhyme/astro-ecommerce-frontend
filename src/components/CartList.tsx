import { useStore } from '@nanostores/react';
import { useMemo } from 'react';
import { cart } from '../state/cart';
import type { ICartItem } from '../state/cart';
import { CartItem } from './CartItem';
import { Message } from './Message';

type CartListProps = {};

export const CartList: React.FC<CartListProps> = () => {
  const cartItems = useStore(cart);

  const subTotalQuantity = useMemo(() => {
    return cartItems?.reduce((cummulation, item) => cummulation + item.qty, 0);
  }, [cartItems]);

  //   Total amount of individual items
  const subTotalAmount = useMemo(() => {
    return cartItems
      ?.reduce((cummulation: number, item: ICartItem) => cummulation + item.qty * item.price, 0)
      .toFixed(2);
  }, [cartItems]);

  return (
    <section className='p-6'>
      {!cartItems?.length && (
        <Message variant='secondary'>
          You have selected no items{' '}
          <a href='/' className='underline text-blue-500'>
            Go Home
          </a>
        </Message>
      )}
      {cartItems?.length && (
        <div className='flex gap-10 justify-center'>
          <div>
            {cartItems?.map((cartItem) => {
              return (
                <CartItem
                  countInStock={cartItem?.countInStock}
                  image={cartItem?.image}
                  name={cartItem?.name}
                  price={cartItem?.price}
                  product={cartItem?.product}
                  qty={cartItem?.qty}
                />
              );
            })}
          </div>

          <div>
            <article className=' w-full max-w-[600px] border-4 mb-6 mx-auto bg-slate-50 py-4'>
              <h2 className='text-xl md:text-2xl  pb-2 px-4 mx-auto uppercase border border-t-0'>
                Subtotal ({subTotalQuantity}) items
              </h2>
              <div className='text-sm flex gap-4   mx-auto border border-t-0 px-4 pt-4 pb-3'>${subTotalAmount}</div>

              <div className='text-sm flex gap-4   mx-auto px-4 pb-3 justify-center'>
                <a
                  href='/checkout'
                  className='bg-slate-900 text-white  px-2 py-2  w-full max-w-[250px] flex gap-3 justify-center mt-8 cursor-pointer hover:bg-slate-800'
                >
                  PROCEED TO CHECKOUT
                </a>
              </div>
            </article>
          </div>
        </div>
      )}
    </section>
  );
};
