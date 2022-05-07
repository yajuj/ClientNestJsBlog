import React, { useContext, FC, useEffect } from 'react';
import api from '../api/api';
import { AuthResponce } from '../types/auth-responsce';
import { IPost } from '../types/posts';
import { User } from '../types/user.types';

interface ContextState {
  posts: IPost[];
  isAuth: boolean;
  error: string | null;
  user: User;
  signUp: (username: string, password: string) => void;
  signIn: (username: string, password: string) => void;
  logout: () => void;
  addPost: (post: Pick<IPost, 'message' | 'photo' | 'video'>) => void;
  updatePost: (updatedPost: Partial<IPost>, id: string) => void;
  removePost: (id: string) => void;
  findPost: (id: string) => Promise<IPost | null | undefined>;
}
interface ContextProps {
  children: React.ReactNode;
}

const Context = React.createContext<ContextState>({} as ContextState);

export const AppContextProvider: React.FC<ContextProps> = ({ children }) => {
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User>({} as User);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    let token = localStorage.getItem('access_token');
    if (token) {
      fetchMe();
      setIsAuth(true);
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get<IPost[]>('/posts');
      setPosts(data);
    } catch (error) {
      setError('Ошибка');
    }
  };
  const fetchMe = async () => {
    try {
      const { data: user } = await api.get<User>('/auth/me');
      setUser(user);
    } catch (error) {
      setError('Ошибка');
    }
  };

  const signUp = async (username: string, password: string) => {
    try {
      const { data } = await api.post<AuthResponce>('/auth/signup', {
        username,
        password,
      });
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      fetchMe();
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
      setError('Ошибка');
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      const { data } = await api.post<AuthResponce>('/auth/signin', {
        username,
        password,
      });
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      fetchMe();
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
      setError('Ошибка');
    }
  };

  const logout = async () => {
    try {
      await api.post<AuthResponce>('/auth/logout');
      setIsAuth(false);
      setUser({} as User);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    } catch (error) {
      setIsAuth(false);
      setError('Ошибка');
    }
  };

  const addPost = async (post: Pick<IPost, 'message' | 'photo' | 'video'>) => {
    try {
      const { data } = await api.post<IPost>('/posts', post);
      setPosts([...posts, data]);
    } catch (error) {
      setError('Ошибка');
    }
  };

  const updatePost = async (updatedPost: Partial<IPost>, id: string) => {
    try {
      const { data } = await api.patch<IPost>(`posts/${id}`, updatedPost);
      setPosts(posts.map(post => (post._id === id ? data : post)));
    } catch (error) {
      setError('Ошибка');
    }
  };

  const findPost = async (id: string) => {
    try {
      const { data } = await api.get<IPost>(`posts/${id}`);
      return data ? data : null;
    } catch (error) {
      setError('Ошибка');
    }
  };

  const removePost = async (id: string) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (error) {
      setError('Ошибка');
    }
  };

  return (
    <Context.Provider
      value={{
        error,
        posts,
        isAuth,
        user,
        signUp,
        signIn,
        logout,
        addPost,
        updatePost,
        removePost,
        findPost,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
