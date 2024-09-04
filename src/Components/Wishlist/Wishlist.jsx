import React, { useContext, useEffect, useState } from 'react';
import style from './Wishlist.module.css'
import { WishlistContext } from '../../Context/WishlistContext';
import { Audio } from 'react-loader-spinner';


export default function Wishlist() {

  let {displayWislist} = useContext(WishlistContext);

  const [wishlistDetails, setWishlistDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function displayWishlist() {
    setIsLoading(true)
    let {data} = await displayWislist();
    setIsLoading(false)
    setWishlistDetails(data);
  }


  useEffect(()=> {
    displayWishlist()
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
      </div> :  wishlistDetails? <div className="w-75 mx-auto p-2 bg-main-light my-3 rounded-2">
      <h2 className="h3">Wishlist:</h2>
      {wishlistDetails.data.map((product)=> <div key={product.id} className='row p-2 border-bottom'>
        <div className="col-md-1">
          <img className='w-100' src={product?.imageCover} alt="product image" />
        </div>
        <div className="col-md-11">
          <div className=" p-2 d-flex justify-content-between align-items-center">
            <div>
              <h3 className="h5">{product.title?.split(' ').slice(0,15).join(' ')}</h3>
              <h3 className="h6 text-main">{product.category?.name}</h3>
              <h3 className="h6 text-main fw-bold">Price: {product?.price} EGP</h3>
            </div>
          </div>
        </div>
      </div>)}
    </div> : <div className='w-75 mx-auto p-2 my-3 rounded-2 d-flex justify-content-center bg-main-light'>
      <h3>Wishlist is Empty</h3>
      </div>}
  </>
}
