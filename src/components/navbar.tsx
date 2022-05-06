import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/app-context';

const NavbarComponent = () => {
  const { isAuth, logout } = useAppContext();

  return (
    <Navbar bg='light' className='mb-3'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>Home</Link>
        </Navbar.Brand>
        <Nav className='me-left'>
          {isAuth ? (
            <Nav.Link onClick={logout}>
              <Button variant='outline-primary'>Logout</Button>
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to='signin'>
              <Button variant='outline-primary'>SignIn</Button>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
