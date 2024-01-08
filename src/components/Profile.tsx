import { useStore } from '@nanostores/react';
import React, { useCallback, useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { errorMyOrderList, listMyOrdersRequest, loadingMyOrderList, myOrderListState } from '../state/order';
import {
  errorGetProfile,
  errorUpdateProfile,
  getProfileState,
  loadingGetProfile,
  loadingUpdateProfile,
  profileGetRequest,
  profileUpdateRequest,
} from '../state/user';
import { Button } from './Button';
import { Heading } from './Heading';
import { Loader } from './Loader';
import { Message } from './Message';

type ProfileProps = {};

export const Profile: React.FC<ProfileProps> = () => {
  const loadingGet = useStore(loadingGetProfile);
  const errorGet = useStore(errorGetProfile);
  const profileGet = useStore(getProfileState);

  const loadingUpdate = useStore(loadingUpdateProfile);
  const errorUpdate = useStore(errorUpdateProfile);

  const loadingList = useStore(loadingMyOrderList);
  const errorList = useStore(errorMyOrderList);
  const orderList = useStore(myOrderListState);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleUpdate = useCallback(async () => {
    profileUpdateRequest(name, email).then(() => {
      profileGetRequest();
    });
  }, [email, name]);

  useEffect(() => {
    profileGetRequest();
    listMyOrdersRequest();
  }, []);

  useEffect(() => {
    if (profileGet?.email) {
      setEmail(profileGet?.email);
      setName(profileGet?.name);
    }
  }, [profileGet]);

  return (
    <section className='p-6'>
      <div className=' mx-auto'>
        <div className='max-w-[500px] '>
          {errorGet && <Message variant='danger'>{errorGet}</Message>}
          {loadingGet && <Loader variant='large' />}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {loadingUpdate && <Loader variant='large' />}
          <Heading text='Update Profile' variant='h2' />

          <form onSubmit={handleUpdate} className='max-w-[500px] mx-auto py-6'>
            <div>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                name='name'
                id='name'
                required
                placeholder='Enter name'
                className='border-2 border-slate-400 p-2 rounded-lg w-full'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label htmlFor='email'> Email:</label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter email'
                className='border-2 border-slate-400 p-2 rounded-lg w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <Button>Save Changes</Button>
          </form>
        </div>

        <div className='max-w-[1800px] my-8 '>
          {errorList && <Message variant='danger'>{errorList}</Message>}
          {loadingList && <Loader variant='large' />}
          <div>
            <Heading text='My Orders' variant='h2' />
            <div className='w-full py-6  overflow-auto'>
              <table className='table-auto border-4 w-full whitespace-nowrap'>
                <thead className='border-b-2'>
                  <tr className='bg-gray-500 text-white '>
                    <th className='text-left border-r-2 px-4 py-2'>ID</th>

                    <th className='text-left border-r-2 px-4 py-2'>Total</th>
                    <th className='text-left border-r-2 px-4 py-2 whitespace-nowrap'>Payment status</th>
                    <th className='text-left border-r-2  px-4 py-2 whitespace-nowrap'>Delivery Status</th>
                    <th className='text-left border-r-2 px-4 py-2'>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orderList?.map((order) => {
                    return (
                      <tr className='capitalize border-b-2' key={order?._id}>
                        <td className='text-left border-r-2 px-4 py-2'>{order?._id}</td>
                        <td className='text-left border-r-2 px-4 py-2'>{order?.totalPrice}</td>
                        <td className='text-left border-r-2 px-4 py-2'>
                          {order?.isPaid ? (
                            <FaCheck className='text-green-500' size={20} />
                          ) : (
                            <FaTimes className='text-red-500' size={20} />
                          )}
                        </td>
                        <td className='text-left border-r-2 px-4 py-2'>
                          {order?.isDelivered ? (
                            <FaCheck className='text-green-500' size={20} />
                          ) : (
                            <FaTimes className='text-red-500' size={20} />
                          )}
                        </td>
                        <td className='text-left border-r-2 px-4 py-2'>
                          <span className='flex gap-4 justify-between'>
                            <a
                              href={`/order/${order?._id}`}
                              className='bg-slate-900 text-white rounded px-4 py-2  w-full max-w-[100px] flex gap-3 justify-center  cursor-pointer hover:bg-slate-800 text-sm'
                            >
                              View
                            </a>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
