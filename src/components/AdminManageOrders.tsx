import { useStore } from '@nanostores/react';
import React, { useCallback, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import {
  deliveryRequest,
  errorDelivery,
  errorOrderList,
  listOrdersRequest,
  loadingDelivery,
  loadingOrderList,
  orderListState,
} from '../state/order';
import { Loader } from './Loader';
import { Message } from './Message';

type AdminManageOrdersProps = {};

export const AdminManageOrders: React.FC<AdminManageOrdersProps> = () => {
  const loadingDeliver = useStore(loadingDelivery);
  const errorDeliver = useStore(errorDelivery);

  const loadingList = useStore(loadingOrderList);
  const errorList = useStore(errorOrderList);
  const orderList = useStore(orderListState);

  const handleUpdateDeliveryStatus = useCallback(async (id: string) => {
    // Approved delivery status
    deliveryRequest(id).then(() => {
      listOrdersRequest();
    });
  }, []);

  useEffect(() => {
    listOrdersRequest();
  }, []);

  return (
    <div className='p-6'>
      {errorDeliver && <Message variant='danger'>{errorDeliver}</Message>}
      {loadingDeliver && <Loader variant='large' />}
      {errorList && <Message variant='danger'>{errorList}</Message>}
      {loadingList && <Loader variant='large' />}

      <div className='w-full my-8 max-w-[1800px] mx-auto overflow-auto'>
        <table className='table-auto border-4 w-full whitespace-nowrap'>
          <thead className='border-b-2'>
            <tr className='bg-gray-500 text-white '>
              <th className='text-left border-r-2 px-4 py-2'>ID</th>
              <th className='text-left border-r-2 px-4 py-2'>User</th>
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
                  <td className='text-left border-r-2 px-4 py-2'>{order?.user?.name}</td>
                  <td className='text-left border-r-2 px-4 py-2'>${order?.totalPrice}</td>
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
                      {order?.isDelivered ? (
                        'Delivered'
                      ) : (
                        <button
                          onClick={() => handleUpdateDeliveryStatus(order?._id)}
                          disabled={loadingDeliver || order?.isDelivered || !order?.isPaid}
                          className='bg-blue-900 text-white rounded px-4 py-2  w-full max-w-[200px] flex gap-3 justify-center  cursor-pointer hover:bg-blue-800 text-sm'
                        >
                          Mark As Delivered
                          {loadingDeliver && <Loader variant='small' />}
                        </button>
                      )}

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
  );
};
