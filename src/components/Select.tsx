import React from 'react';

type SelectProps = {
  value: string | number;
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void;
  name?: string;
  length: number;
  maxWidth?: string;
};

const Select: React.FC<SelectProps> = ({ value, onChange, name = 'count in stock', length, maxWidth = '100px' }) => {
  return (
    <select
      name={name}
      onChange={onChange}
      value={value}
      className='border-2 border-slate-400 p-2 rounded-lg w-full'
      style={{ maxWidth }}
    >
      {[...Array.from({ length }).keys()].map((num) => {
        return (
          <option key={num} value={num + 1}>
            {num + 1}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
