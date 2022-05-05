import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/app-context';

const SignInPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { error, signIn, isAuth } = useAppContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(username, password);
  };

  if (isAuth) return <Navigate to='/' />;

  return (
    <div className='d-sm-flex vh-100 justify-content-center align-items-center'>
      <Form onSubmit={handleSubmit}>
        <h2>SignIn</h2>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={e => setUsername(e.target.value)}
            type='text'
            placeholder='Enter username'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
          />
        </Form.Group>
        {error && <p className='text-danger'>{error}</p>}
        <Form.Group className='mt-3'>
          <Button variant='primary' type='submit'>
            SignIn
          </Button>
        </Form.Group>
        <Form.Group className='mt-3'>
          <Button variant='link'>
            <Link to='/signup'>
              SignUp if you don't have <br /> an account yet
            </Link>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SignInPage;
