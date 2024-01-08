import { useStore } from '@nanostores/react';
import React, { useEffect } from 'react';
import { errorProductList, listProductRequest, loadingProductList, productListState } from '../state/products';
import { Heading } from './Heading';
import { Loader } from './Loader';
import { Message } from './Message';
import { Product } from './Product';

type ProductListProps = {};

export const ProductList: React.FC<ProductListProps> = () => {
  const loading = useStore(loadingProductList);
  const error = useStore(errorProductList);
  const productList = useStore(productListState);

  console.log({ productList });

  useEffect(() => {
    listProductRequest();
  }, []);

  return (
    <section className='my-8 px-5'>
      <Heading text='Amazing Products' />
      {loading && <Loader variant='large' />}
      {error && <Message variant='danger'>{error}</Message>}
      <div className='flex justify-center'>
        <div className='flex flex-wrap gap-8 mx-auto max-w-[1800px] '>
          {productList?.products?.map((product) => {
            return <Product product={product} key={product?._id} />;
          })}
        </div>
      </div>
    </section>
  );
};
