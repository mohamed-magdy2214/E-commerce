import React, { useContext, useEffect } from 'react';
import style from './Products.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Audio } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';


export default function Products() {

  let {addToCart , setNumOfCartItems , getLoggedUserCart } = useContext(CartContext);
  let {addToWishlist} = useContext(WishlistContext);


async function displayCart() {
  let {data} = await getLoggedUserCart()
  setNumOfCartItems(data?.numOfCartItems);
}

async function addProductToCart(productId) {

  let {data} = await addToCart(productId);
  
  if(data.status === 'success') {

    toast.success(data.message);
  }
  else {
    toast.error("product didn't add to cart");
  }
  setNumOfCartItems(data.numOfCartItems);
}

async function addToWiahlist(productId) {

  let {data} = await addToWishlist(productId)
  
  if(data.status === 'success') {

    toast.success(data.message);
    document.getElementById(productId).classList.add('text-main')
  }
  else {
    toast.error("product didn't add to cart");
  }
}

  function getAllProducts() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

  let {data , isLoading} = useQuery('allProducts' , getAllProducts);

  useEffect(()=> {
    displayCart()
  } , [])

  return <>
    {isLoading? <div className='py-4 d-flex justify-content-center'>
      <Audio
              height="100"
              width="100"
              color="#0F67B1"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
    </div> : <div className="py-4 px-5">
      <div className="row gy-4">
        {data?.data.data.map((product)=> <div className='col-md-2 product' key={product.id}> 

          <Link  to={`/productDetails/${product.id}`}>
            <img src={product.imageCover} className='w-100' alt="cover image" />
            <div className="description p-2">
              <h3 className='h6 text-main'>{product.category.name}</h3>
              <h2 className='h6'>{product.title.split(" ").slice(0,2).join(' ')}</h2>

              <div className="d-flex justify-content-between mt-2">
              <span className="price text-main">{product.price} EGP</span>
              <span className="rating">
                <i className='fa fa-star rating-color me-1'></i>
                {product.ratingsAverage}
              </span>
              </div>
            </div>
          </Link>
          <div className="d-flex justify-content-around align-items-center">
            <button onClick={()=> addProductToCart(product.id)} className='btn bg-main text-white my-2 w-75'>Add to Cart</button>
            <i id={product.id} onClick={()=> addToWiahlist(product.id)} class="fa-solid fa-heart fa-xl cursor-pointer"></i>
          </div>
        </div>)}
        
      </div>
    </div>}
  </>
}
