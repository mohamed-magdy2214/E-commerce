import React, { useContext, useEffect, useState } from 'react';
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext';
import { useQuery } from 'react-query';
import { Audio } from 'react-loader-spinner';
import { Link } from 'react-router-dom';



export default function Cart() {

  let {getLoggedUserCart , removeCart , clearCart , setNumOfCartItems , updateProductCount} = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function displayCart() {
    setIsLoading(true)
    let {data} = await getLoggedUserCart()
    setIsLoading(false)
    setCartDetails(data);
    setNumOfCartItems(data?.numOfCartItems);
  }

  async function removeCartItem (id) {
    setIsLoading(true)
    let {data} = await removeCart(id)
    setIsLoading(false)
    setCartDetails(data);
    setNumOfCartItems(data?.numOfCartItems);
  }

  async function clearUserCart() {
    let {data} = await clearCart()
    
    if(data.message === 'success') {
      setCartDetails(false)
      setIsLoading(false)
    }
  }

  async function updateProductQuantity(productId , count) {

    let {data} = await updateProductCount(productId , count)
    setCartDetails(data)
  }

  useEffect(()=> {
    displayCart()
  }, [])


  return <>
    {isLoading? <div className='w-75 mx-auto p-2 my-3 rounded-2 d-flex justify-content-center bg-main-light'>
      <Audio
                height="100"
                width="100"
                color="#0F67B1"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
              />
      </div> :  cartDetails? <div className="w-75 mx-auto p-2 bg-main-light my-3 rounded-2">
      <div className="d-flex justify-content-between align-items-center" id='cart'>
        <div className=' w-25 small-screens'>
          <h2 className="h3">Shop Cart:</h2>
          <h3 className="h6 text-main fw-bold mb-3">Totla Price: {cartDetails.data.totalCartPrice} EGP</h3>
        </div>
        <div className="clear text-center p-2 w-25 small-screens">
          <button onClick={()=> clearUserCart()} className='btn bg-main text-white w-100'>Clear Cart</button>
        </div>
      </div>
      {cartDetails.data.products.map((product)=> <div key={product.product.id} className='row p-2 border-bottom'>
        <div className="col-md-1">
          <img className='w-100' src={product.product.imageCover} alt="product image" />
        </div>
        <div className="col-md-11">
          <div className="d-flex justify-content-between align-items-center p-2">
            <div>
              <h3 className="h6">{product.product.title.split(' ').slice(0,10).join(' ')}</h3>
              <h3 className="h6 text-main fw-bold">Price: {product.price} EGP</h3>
            </div>
            <div>
              <button onClick={() => updateProductQuantity(product.product.id , product.count +1)} className='btn p-1 border-btn'>+</button>
              <span className='mx-2'>{product.count}</span>
              <button onClick={() => updateProductQuantity(product.product.id , product.count -1)} className='btn p-1 border-btn'>-</button>
            </div>
          </div>
          <button onClick={()=> removeCartItem(product.product.id)} className='btn bg-main text-white'>
            <i className='fa fa-trash-can font-sm me-2'></i>
            Remove
          </button>
        </div>
      </div>)}
      <div className="payment d-flex justify-content-center align-items-center my-2">
        <Link to={'/onlinepayment'} className="btn bg-main text-white me-2 w-25">Online Payment</Link>
        <Link className="btn bg-main text-white me-2 w-25">Cash on Delivery</Link>
      </div>
    </div>: <div className='w-75 mx-auto p-2 my-3 rounded-2 d-flex justify-content-center bg-main-light'>
      <h3>Cart is Empty</h3>
      </div>}

    
  </>
}
