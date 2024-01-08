import { useStore } from '@nanostores/react';
import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { addToCart, cart } from '../state/cart';
import { errorGetProduct, getProductRequest, loadingGetProduct, productGetState } from '../state/products';
import { AddReview } from './AddReview';
import { Button } from './Button';
import { Heading } from './Heading';
import { Loader } from './Loader';
import { Message } from './Message';
import { Rating } from './Rating';
import Select from './Select';

type ProductDetailsProps = {
  id: string;
};

export const ProductDetails: React.FC<ProductDetailsProps> = ({ id }) => {
  const loadingProduct = useStore(loadingGetProduct);
  const errorProduct = useStore(errorGetProduct);
  const product = useStore(productGetState);
  const rating = product?.rating;
  const reviewsCount = product?.reviews?.length;

  const cartItems = useStore(cart);

  const [qty, setQty] = useState<string | number>('1');

  const handleAddToCart = useCallback(async (quantity: string | number) => {
    await addToCart(id, Number(quantity));
  }, []);

  useEffect(() => {
    getProductRequest(id);
  }, [id]);

  useEffect(() => {
    const cartItem = cartItems?.find((cartItem) => cartItem?.product === id);

    setQty(cartItem?.qty || 1);
  }, [cartItems]);

  return (
    <section>
      {errorProduct && <Message variant='danger'>{errorProduct}</Message>}
      {loadingProduct && <Loader variant='large' />}
      <Heading text={product?.name || ''} variant='h1' textAlign='center' />

      <a
        href='/'
        className='bg-slate-900 text-white rounded px-4 py-2  w-full max-w-[100px] flex gap-3 justify-center  cursor-pointer hover:bg-slate-800 text-sm items-center'
      >
        <FaArrowLeft size={15} /> Back
      </a>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 py-6'>
        <article>
          <div>
            <img src={product.image} alt={product.name} className='w-full h-[500px] object-cover' />
          </div>

          <h2 className='text-xl md:text-2xl  pt-6 pb-2 mx-auto uppercase'>Customer Reviews</h2>

          {!product?.reviews?.length && <Message variant='info'>There are no Reviews</Message>}

          {product?.reviews?.map((review) => {
            return (
              <div className='border-2 mb-4 p-2'>
                <div>
                  <span>{review?.name}</span>
                  <span>
                    <Rating text={''} value={review?.rating} />
                  </span>
                </div>
                <p>{review?.comment}</p>
              </div>
            );
          })}
        </article>
        <article>
          <div>
            <h2 className='text-xl md:text-2xl  mx-auto border px-4 pt-4 pb-8 uppercase'>{product?.name}</h2>
            <div className='text-xl md:text-2xl  mx-auto border border-t-0 px-4 pt-4 pb-3'>
              <Rating value={rating} text={`${reviewsCount} reviews`} />
            </div>
            <div className='text-sm block  capitalize mx-auto border border-t-0 px-4 pt-4 pb-3'>
              Price: ${product?.price}
            </div>
            <div className='text-sm block  mx-auto border border-t-0 px-4 pt-4 pb-3'>
              Description: {product?.description}
            </div>

            <AddReview id={id} />
          </div>
        </article>
        <article>
          <div className='text-sm flex gap-4   mx-auto border border-t-0 px-4 pt-4 pb-3'>Price: ${product?.price}</div>
          <div className='text-sm flex gap-4   mx-auto border border-t-0 px-4 pt-4 pb-3'>
            Status: {product?.countInStock ? 'In Stock' : 'Out of Stock'}
          </div>
          <div className='text-sm flex gap-4 items-center  mx-auto border border-t-0 px-4 pt-4 pb-3'>
            Quantity:
            <Select length={product?.countInStock} onChange={(e) => setQty(e.target.value)} value={qty} />
          </div>

          <div className='text-sm flex gap-4   mx-auto border border-t-0 px-4 pb-3 justify-center'>
            <Button size='small' onClick={() => handleAddToCart(qty)} type='button'>
              ADD TO CART
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
};
