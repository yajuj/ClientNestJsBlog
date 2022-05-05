import React, { useEffect } from 'react';
import { Navbar, Card } from 'react-bootstrap';
import api from '../api/api';
import PostForm from '../components/form';
import Post from '../components/post';
import { useAppContext } from '../context/app-context';
import AppRoutes from '../routes';
import { IPost } from '../types/posts';

function MainPage() {
  const { posts, removePost, user, isAuth } = useAppContext();
  return (
    <main className='container'>
      {isAuth && (
        <Card style={{ width: '70%' }} className='p-3 mb-1 mx-auto'>
          <PostForm />
        </Card>
      )}
      {posts.map(post => (
        <Post {...post} key={post._id} removePost={removePost} user={user} />
      ))}
    </main>
  );
}

export default MainPage;
