import { useStore } from '@nanostores/react';
import React, { useCallback, useEffect, useState } from 'react';
import {
  deleteProductRequest,
  errorDeleteProduct,
  errorProductList,
  listProductRequest,
  loadingDeleteProduct,
  loadingProductList,
  productListState,
} from '../state/products';
import { Button } from './Button';
import { CreateProduct } from './CreateProduct';
import { Dialog } from './Dialog';
import { Loader } from './Loader';
import { Message } from './Message';
type ManageProductsProps = {};

export const AdminManageProducts: React.FC<ManageProductsProps> = () => {
  const loadingList = useStore(loadingProductList);
  const errorList = useStore(errorProductList);
  const productList = useStore(productListState);

  const loadingDelete = useStore(loadingDeleteProduct);
  const errorDelete = useStore(errorDeleteProduct);

  const [openForm, setOpenForm] = useState<boolean>(false);

  const handleDelete = useCallback(async (id: string) => {
    deleteProductRequest(id).then(() => {
      listProductRequest();
    });
  }, []);

  useEffect(() => {
    listProductRequest();
  }, []);

  return (
    <div className='p-6'>
      <Button size='small' onClick={() => setOpenForm(true)}>
        Create Product
      </Button>
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <CreateProduct onClose={() => setOpenForm(false)} />
      </Dialog>

      {errorList && <Message variant='danger'>{errorList}</Message>}
      {loadingList && <Loader variant='large' />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      <div className='w-full my-8 max-w-[1800px] mx-auto overflow-auto'>
        <table className='table-auto border-4 w-full whitespace-nowrap'>
          <thead className='border-b-2'>
            <tr className='bg-gray-500 text-white '>
              <th className='text-left border-r-2 px-4 py-2'>Name</th>
              <th className='text-left border-r-2 px-4 py-2'>Brand</th>
              <th className='text-left border-r-2 px-4 py-2'>Price</th>
              <th className='text-left border-r-2 px-4 py-2'>Category</th>
              <th className='text-left border-r-2  px-4 py-2'>Count in stock</th>

              <th className='text-left border-r-2 px-4 py-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {productList?.products?.map((product) => {
              return (
                <tr className='capitalize border-b-2' key={product?._id}>
                  <td className='text-left border-r-2 px-4 py-2'>{product?.name}</td>
                  <td className='text-left border-r-2 px-4 py-2'>{product?.brand}</td>
                  <td className='text-left border-r-2 px-4 py-2'>${product?.price}</td>
                  <td className='text-left border-r-2 px-4 py-2'>{product?.category}</td>
                  <td className='text-left border-r-2 px-4 py-2'>{product?.countInStock}</td>

                  <td className='text-left border-r-2 px-4 py-2'>
                    <span className='flex gap-4'>
                      <a
                        href={`/product/${product?._id}`}
                        className='bg-slate-900 text-white rounded px-4 py-2  w-full max-w-[100px] flex gap-3 justify-center  cursor-pointer hover:bg-slate-800 text-sm'
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleDelete(product?._id)}
                        disabled={loadingDelete}
                        className='bg-red-900 text-white rounded px-4 py-2  w-full max-w-[100px] flex gap-3 justify-center  cursor-pointer hover:bg-red-800 text-sm'
                      >
                        Remove {loadingDelete && <Loader variant='small' />}
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
