import { useStore } from '@nanostores/react';
import React, { useCallback, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import {
  errorUpdateUser,
  errorUsers,
  loadingUpdateUser,
  loadingUsers,
  makeAdminRequest,
  usersRequest,
  usersState,
} from '../state/user';
import { Loader } from './Loader';
import { Message } from './Message';

type AdminManageUsersProps = {};

export const AdminManageUsers: React.FC<AdminManageUsersProps> = () => {
  const loadingList = useStore(loadingUsers);
  const errorList = useStore(errorUsers);
  const usersList = useStore(usersState);

  const loadingUpdate = useStore(loadingUpdateUser);
  const errorUpdate = useStore(errorUpdateUser);

  const handleMakeAdmin = useCallback((id: string) => {
    makeAdminRequest(id).then(() => {
      usersRequest();
    });
  }, []);

  useEffect(() => {
    usersRequest();
  }, []);

  return (
    <div className='p-6'>
      {errorList && <Message variant='danger'>{errorList}</Message>}
      {loadingList && <Loader variant='large' />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loadingUpdate && <Loader variant='large' />}

      <div className='w-full my-8 max-w-[1800px] mx-auto overflow-auto'>
        <table className='table-auto border-4 w-full whitespace-nowrap'>
          <thead className='border-b-2'>
            <tr className='bg-gray-500 text-white '>
              <th className='text-left border-r-2 px-4 py-2'>ID</th>
              <th className='text-left border-r-2 px-4 py-2'>Name</th>
              <th className='text-left border-r-2 px-4 py-2'>Email</th>
              <th className='text-left border-r-2 px-4 py-2'>Admin</th>
            </tr>
          </thead>
          <tbody>
            {usersList?.map((user) => {
              return (
                <tr className='capitalize border-b-2' key={user?._id}>
                  <td className='text-left border-r-2 px-4 py-2'>{user?._id}</td>
                  <td className='text-left border-r-2 px-4 py-2'>{user?.name}</td>
                  <td className='text-left border-r-2 px-4 py-2'>{user?.email}</td>
                  <td className='text-left border-r-2 px-4 py-2'>
                    <span className='flex gap-4 justify-between'>
                      {user?.isAdmin ? (
                        <FaCheck className='text-green-500' size={20} />
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user?._id || '')}
                          disabled={false}
                          className='bg-blue-900 text-white rounded px-4 py-2  w-full max-w-[200px] flex gap-3 justify-center  cursor-pointer hover:bg-blue-800 text-sm'
                        >
                          Make Admin
                          {loadingUpdate && <Loader variant='small' />}
                        </button>
                      )}
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
