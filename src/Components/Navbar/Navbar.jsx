import React, { useContext }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext/UserContext'





export default function Navbar() {
  let navigate = useNavigate();
  
  let {userToken, setUserToken} = useContext(UserContext);

function logOut() {
  localStorage.removeItem('userToken')
  setUserToken(null)
  navigate('/login')

}

  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

        {userToken !== null? <>
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/wishlist">Wish List</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        </>:''}
        
        
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex align-items-center">
          <i className="fa-brands fa-facebook me-2 cursor-pointer"></i>
          <i className="fa-brands fa-instagram me-2 cursor-pointer"></i>
          <i className="fa-brands fa-tiktok me-2 cursor-pointer"></i>
          <i className="fa-brands fa-twitter me-2 cursor-pointer"></i>
          <i className="fa-brands fa-youtube me-2 cursor-pointer"></i>
        </li>

        {userToken !== null?<>
          <li className="nav-item">
          <span onClick={()=> logOut()} className="nav-link cursor-pointer" >Logout</span>
        </li>
        </>:<>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        </>}
        
        
      </ul>
    </div>
  </div>
</nav>

    </>
}
