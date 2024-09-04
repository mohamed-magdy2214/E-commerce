import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Wishlist from './Components/Wishlist/Wishlist'
import Products from './Components/Products/Products'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import OnlinePayment from './Components/OnlinePayment/OnlinePayment'
import Orders from './Components/Orders/Orders'
import NotFound from './Components/NotFound/NotFound'
import ProductDetails from './Components/ProductDetails/ProductDetails';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import { useContext } from 'react';
import { UserContext } from './Context/UserContext';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import WishlistContextProvider from './Context/WishlistContext';





function App() {

  const routers = createBrowserRouter([
    {path:'/' , element: <Layout/> , children: [
      {index:true , element: <ProtectedRoute><Home/></ProtectedRoute>},
      {path:'/products' , element: <ProtectedRoute><Products/></ProtectedRoute>},
      {path:'/cart' , element: <ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'/categories' , element: <ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'/brands' , element: <ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'/wishlist' , element: <ProtectedRoute><Wishlist/></ProtectedRoute>},
      {path:'/onlinepayment' , element: <ProtectedRoute><OnlinePayment/></ProtectedRoute>},
      {path:'/allorders' , element: <ProtectedRoute><Orders/></ProtectedRoute>},
      {path:'/login' , element: <Login/>},
      {path:'/register' , element: <Register/>},
      {path:'/productDetails/:productId' , element: <ProductDetails/>},
      {path:'*' , element: <NotFound/>},
    ]}
  ])


  let {setUserToken} = useContext(UserContext);

  if(localStorage.getItem('userToken') !== null) {

    setUserToken(localStorage.getItem('userToken'))
  }
  return <>
  <WishlistContextProvider>

    <CartContextProvider>

    <RouterProvider router={routers}></RouterProvider>
    <Toaster></Toaster>
    
    </CartContextProvider>
  </WishlistContextProvider>
  </>
}

export default App;
