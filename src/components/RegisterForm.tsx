import { useStore } from '@nanostores/react';
import React, { useState } from 'react';
import { errorRegister, loadingRegister, registerRequest } from '../state/auth';
import { Button } from './Button';
import { Loader } from './Loader';
import { Message } from './Message';

type RegisterFormProps = {};

export const RegisterForm: React.FC<RegisterFormProps> = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const loading = useStore(loadingRegister);
  const error = useStore(errorRegister);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setMessage('');

    registerRequest(name, email, password);
  };

  return (
    <>
      <form onSubmit={handleRegister} className='max-w-[500px] mx-auto py-6'>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
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
        <div>
          <label htmlFor='password'> Password:</label>
          <input
            type='password'
            name='password'
            id='password'
            required
            placeholder='Enter password'
            className='border-2 border-slate-400 p-2 rounded-lg w-full'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            required
            placeholder='Confirm password'
            className='border-2 border-slate-400 p-2 rounded-lg w-full'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <p className='my-5 text-right'>
          Already have an account?{' '}
          <a href='/login' className='text-blue-500 underline'>
            Login
          </a>
        </p>
        <Button loading={loading}>Register</Button>
      </form>
    </>
  );
};
