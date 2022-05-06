import React from 'react';
import { Route, Routes } from 'react-router';
import NavbarComponent from './components/navbar';
import MainPage from './pages/main';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import UpdatePage from './pages/update';

const AppRoutes = () => {
  return (
    <React.Fragment>
      <NavbarComponent />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/update/:id' element={<UpdatePage />} />
      </Routes>
    </React.Fragment>
  );
};

export default AppRoutes;
