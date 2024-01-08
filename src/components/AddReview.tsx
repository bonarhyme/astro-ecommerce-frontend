import { useStore } from '@nanostores/react';
import React, { useCallback, useState } from 'react';
import { errorReviewProduct, getProductRequest, loadingReviewProduct, reviewProductRequest } from '../state/products';
import { Button } from './Button';
import { Message } from './Message';
import Select from './Select';

type AddReviewProps = {
  id: string;
};

export const AddReview: React.FC<AddReviewProps> = ({ id }) => {
  const error = useStore(errorReviewProduct);
  const loading = useStore(loadingReviewProduct);

  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<string>('');

  const handleAddReview = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!comment || !rating) {
        return;
      }
      reviewProductRequest(id, rating, comment).then(() => {
        getProductRequest(id);
        setComment('');
        setRating('');
      });
    },
    [id, rating, comment]
  );
  return (
    <div className='w-full'>
      <h2 className='text-xl   pt-6 pb-2 mx-auto uppercase'>Add Reviews</h2>

      <div>
        <form onSubmit={handleAddReview}>
          {error && <Message variant='danger'>{error}</Message>}

          <div className='flex flex-col'>
            <label htmlFor='rating'>Rating</label>
            <Select length={5} onChange={(e) => setRating(e.target.value)} value={rating} name='rating' />
          </div>
          <br />
          <div>
            <label htmlFor='comment'>Comment</label>
            <textarea
              name='comment'
              id='comment'
              className='border-2 border-slate-400 p-2 rounded-lg w-full'
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              required
            ></textarea>
            <br />
            <Button size='small' loading={loading}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
