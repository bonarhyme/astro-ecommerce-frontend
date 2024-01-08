import React from 'react';

type ShowcaseProps = {};

export const ShowCase: React.FC<ShowcaseProps> = () => {
  return (
    <div className='border-2 border-slate-400 w-full max-w-[1800px] h-[500px] flex justify-center items-center text-3xl'>
      Showcase top products here or show any special ad here
    </div>
  );
};
