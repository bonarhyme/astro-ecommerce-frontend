import React from 'react';
import { IoMdStarOutline, IoMdStar, IoMdStarHalf } from 'react-icons/io';

type RatingProps = {
  value: number;
  text: string;
};

export const Rating: React.FC<RatingProps> = ({ value, text }) => {
  return (
    <div className=''>
      <div className='flex  text-yellow-500'>
        {value >= 1 ? (
          <IoMdStar size={20} />
        ) : value >= 0.5 ? (
          <IoMdStarHalf size={20} />
        ) : (
          <IoMdStarOutline size={20} />
        )}
        {value >= 2 ? (
          <IoMdStar size={20} />
        ) : value >= 1.5 ? (
          <IoMdStarHalf size={20} />
        ) : (
          <IoMdStarOutline size={20} />
        )}
        {value >= 3 ? (
          <IoMdStar size={20} />
        ) : value >= 2.5 ? (
          <IoMdStarHalf size={20} />
        ) : (
          <IoMdStarOutline size={20} />
        )}
        {value >= 4 ? (
          <IoMdStar size={20} />
        ) : value >= 3.5 ? (
          <IoMdStarHalf size={20} />
        ) : (
          <IoMdStarOutline size={20} />
        )}
        {value >= 5 ? (
          <IoMdStar size={20} />
        ) : value >= 4.5 ? (
          <IoMdStarHalf size={20} />
        ) : (
          <IoMdStarOutline size={20} />
        )}
      </div>

      {text && <span className='text-sm block pl-1 capitalize'>{text}</span>}
    </div>
  );
};
