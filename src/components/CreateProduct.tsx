import { useStore } from '@nanostores/react';
import React, { useCallback, useState } from 'react';
import { createProductRequest, errorCreateProduct, listProductRequest, loadingCreateProduct } from '../state/products';
import { Button } from './Button';
import { Heading } from './Heading';
import { Message } from './Message';

const categoryItems = ['phones', 'computers', 'electronics', 'phone accessories', 'fashion', 'bags'];

type CreateProductProps = {
  onClose(): void;
};

export const CreateProduct: React.FC<CreateProductProps> = ({ onClose }) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [countInStock, setCountInStock] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const error = useStore(errorCreateProduct);
  const loading = useStore(loadingCreateProduct);

  const handleCreateProduct = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!name || !price || !brand || !category || !countInStock || !description || !image) {
        setMessage('Missing inputs');
        return;
      }
      await createProductRequest(name, price, brand, category, countInStock, description, image).then((value) => {
        onClose();
        listProductRequest();
      });
    },
    [name, price, brand, category, countInStock, description, image]
  );

  return (
    <form onSubmit={handleCreateProduct} className='max-w-[500px] mx-auto py-6 pb-28'>
      <Heading text='Create Product' variant='h3' textAlign='center' />
      <br />
      {error && <Message variant='danger'>{error}</Message>}

      <div>
        <label htmlFor='name'>Product Name:</label>
        <input
          type='text'
          name='name'
          id='name'
          required
          placeholder='Enter name'
          className='border-2 border-slate-400 p-2 rounded-lg w-full'
          value={name}
          onChange={(e) => {
            console.log({ vall: e.target.value });
            setName(e.target.value);
            setMessage('');
          }}
        />
      </div>
      <br />
      <div>
        <label htmlFor='brand'>Brand:</label>
        <input
          type='text'
          name='brand'
          id='name'
          required
          placeholder='Enter brand'
          className='border-2 border-slate-400 p-2 rounded-lg w-full'
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setMessage('');
          }}
        />
      </div>
      <br />
      <div>
        <label htmlFor='price'>Price:</label>
        <input
          type='number'
          name='price'
          id='price'
          required
          placeholder='Enter price'
          className='border-2 border-slate-400 p-2 rounded-lg w-full'
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setMessage('');
          }}
        />
      </div>
      <br />
      <div>
        <label htmlFor='category'>Category:</label>
        <select
          name='category'
          id='category'
          className='border-2 border-slate-400 p-2 rounded-lg w-full capitalize'
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setMessage('');
          }}
        >
          {categoryItems?.map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </select>
      </div>
      <br />
      <div>
        <label htmlFor='countInStock'>Count in stock:</label>
        <input
          type='number'
          name='countInStock'
          id='countInStock'
          required
          placeholder='Enter count in stock'
          className='border-2 border-slate-400 p-2 rounded-lg w-full'
          value={countInStock}
          onChange={(e) => {
            setCountInStock(e.target.value);
            setMessage('');
          }}
        />
      </div>
      <br />
      <div>
        <label htmlFor='description'>Description:</label>
        <textarea
          name='description'
          id='description'
          className='border-2 border-slate-400 p-2 rounded-lg w-full'
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setMessage('');
          }}
        ></textarea>
      </div>
      <br />
      <div>
        <label htmlFor='image'>Image Url:</label>
        <input
          type='text'
          name='image'
          id='image'
          required
          placeholder='Enter image url'
          className='border-2 border-slate-400 p-2 rounded-lg w-full'
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
            setMessage('');
          }}
        />
      </div>
      <br />

      {image && <img src={image} width={300} height={300} style={{ objectFit: 'cover' }} alt='Product image' />}
      {message && <Message variant='danger'>{message}</Message>}
      <br />

      <Button loading={loading}>Submit</Button>
    </form>
  );
};
