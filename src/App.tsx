import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar';
import api from './api/api';
import { IPost } from './types/posts';
import Post from './components/post';
import PostForm from './components/form';
import { Card } from 'react-bootstrap';
import AppRoutes from './routes';

function App() {
  return <AppRoutes />;
}

export default App;
