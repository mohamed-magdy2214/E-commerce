import React, { useContext, useState } from 'react';
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';
import {UserContext} from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {

  let {numOfCartItems} = useContext(CartContext)
  let {userToken , setUserToken} = useContext(UserContext);
  let navigate = useNavigate()

  const [activeLink, setactiveLink] = useState('');

  function handleClick(link) {
    setactiveLink(link)
  }

  function logOut() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
  }

  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">
      <img src={logo} alt="logo" />
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        {userToken !== null? <>
          <li className="nav-item">
          <Link
           className={`nav-link ${activeLink === 'home' ? 'active': ''}`} 
           onClick={()=> handleClick('home')}
           to="/">
            Home
            </Link>
        </li>

        <li className="nav-item">
          <Link 
          className={`nav-link item-num ${activeLink === 'cart' ? 'active': ''}`} 
           onClick={()=> handleClick('cart')} 
          to="/cart">
          Cart <i className="fa-solid fa-cart-shopping font-sm me-1"></i>
          <span className='num-item'>{numOfCartItems}</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
           className={`nav-link ${activeLink === 'products' ? 'active': ''}`} 
           onClick={()=> handleClick('products')} 
           to="/products">
            Products
            </Link>
        </li>

        <li className="nav-item">
          <Link 
            className={`nav-link ${activeLink === 'categories' ? 'active': ''}`} 
            onClick={()=> handleClick('categories')}
            to="/categories">
            Categories
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link ${activeLink === 'brands' ? 'active': ''}`} 
            onClick={()=> handleClick('brands')}
            to="/brands">
            Brands
            </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link ${activeLink === 'wishlist' ? 'active': ''}`} 
            onClick={()=> handleClick('wishlist')}
            to="/wishlist">
            Wishlist
            </Link>
        </li>

        </> : ''}
          
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex align-items-center">
          <i className='fab fa-facebook me-2 cursor-pointer text-main'></i>
          <i className='fab fa-instagram me-2 cursor-pointer text-main'></i>
          <i className='fab fa-twitter me-2 cursor-pointer text-main'></i>
          <i className='fab fa-linkedin me-2 cursor-pointer text-main'></i>
          <i className='fab fa-youtube me-2 cursor-pointer text-main'></i>
        </li>

          {userToken !== null? <>
            <li className="nav-item">
              <span className="nav-link cursor-pointer" onClick={()=> logOut()}>Logout</span>
            </li>
          </> : <>
          <li className="nav-item">
            <Link
              className={`nav-link ${activeLink === 'login' ? 'active': ''}`} 
              onClick={()=> handleClick('login')}
              to="/login">
              Login
              </Link>
          </li>
        
          <li className="nav-item">
            <Link
              className={`nav-link ${activeLink === 'register' ? 'active': ''}`} 
              onClick={()=> handleClick('register')}
              to="/register">
              Register
              </Link>
          </li>
          </>}
            
          
      </ul>
    </div>
  </div>
</nav>

  </>
}
