import React from 'react';
import { FaTimes } from 'react-icons/fa';

type DialogProps = {
  children: React.ReactNode;
  open: boolean;
  onClose(): void;
};

export const Dialog: React.FC<DialogProps> = ({ children, open, onClose }) => {
  return (
    <>
      {open ? (
        <div
          className='fixed w-full right-0 left-0 bottom-0 top-0 z-50'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className='flex justify-center items-center h-full'>
            <div className='min-h-[700px]  bg-white  w-full max-w-[500px] m-auto py-4'>
              <div className='flex justify-end mb-4 px-4'>
                <FaTimes className='text-red-500' size={20} onClick={onClose} />
              </div>
              <div className='h-[650px] overflow-y-auto px-4'>{children}</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
