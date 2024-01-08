import { useStore } from '@nanostores/react';
import React, { useState } from 'react';
import { errorLogin, loadingLogin, loginRequest } from '../state/auth';
import { Button } from './Button';
import { Message } from './Message';

type LoginFormProps = {};

export const LoginForm: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loading = useStore(loadingLogin);
  const error = useStore(errorLogin);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginRequest(email, password);
  };

  return (
    <form onSubmit={handleLogin} className='max-w-[500px] mx-auto py-6'>
      {error && <Message variant='danger'>{error}</Message>}
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

      <p className='my-5 text-right'>
        Don't have an account?{' '}
        <a href='/register' className='text-blue-500 underline'>
          Register
        </a>
      </p>

      <Button loading={loading}>Login</Button>
    </form>
  );
};
