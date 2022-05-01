import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './header.css'

const Header = () => {

  // This try catch will keep the app running in spite of any error shows up in JSON
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user-info'));
  }catch(e){
    console.error(e);
  }

  function logout(){
    localStorage.clear();
    navigator("/login");
  }

  const navigator = useNavigate();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
          <Nav className="nav_list">
            {
              localStorage.getItem('user-info') ? 
              <>
                <Nav.Link href='/add-product'>Add Product</Nav.Link>
                <Nav.Link href='/update-product'>Edit Product</Nav.Link>
                <Nav.Link href='/delete-product'>Delete Product</Nav.Link>
                <Nav.Link href='/'>View Products</Nav.Link>
              </>
              :
              <>
                <Nav.Link href='/login' className='btn btn-outline-primary' id='header__login'>Login</Nav.Link>
                <Nav.Link href='/register' className='right_side' id='header__register'>Register</Nav.Link>
              </>
            }
            {/* <Nav.Link href='/add-product'>Add Product</Nav.Link>
            <Nav.Link href='/update-product'>Edit Product</Nav.Link>
            <Nav.Link href='/delete-product'>Delete Product</Nav.Link> */}
            {/* <Nav.Link href='/login' className='btn btn-outline-primary' id='header__login'>Login</Nav.Link>
            <Nav.Link href='/register' className='right_side' id='header__register'>Register</Nav.Link> */}
          </Nav>
          {
            localStorage.getItem('user-info') ?
              <Nav>
                  <NavDropdown title={user.name}>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
              </Nav>
            : null
          }
      </Container>
    </Navbar>
  )
}

export default Header