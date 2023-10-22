
import React, { useContext, useEffect, useState } from 'react'
import { WishlistContext } from '../../Context/WishListContext';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function WishList() {
    let { addToCart } = useContext(CartContext);
    
    async function addProductToCart(id) {
        let response = await addToCart(id);
   
        if(response.data.status === 'success'){
   
           toast.success('product successfully added to your cart', {
               duration: 4000,
               position: 'top-center'
           })
        }
        else {
       toast.dismiss('product successfully added', {
               duration: 4000,
               position: 'top-center'
           })
        }
     }

    let [wishList, setWishList] = useState(null);
    let {getUserWishlist , removeItem} = useContext(WishlistContext);

    

    async function getWishlist(){
        let {data} = await getUserWishlist();
        setWishList(data?.data)
        console.log(wishList);
    }

    async function removeUserItem(id){
        let {data} = await removeItem(id)
        setWishList(data?.data.products)
    }

    useEffect(()=> {
        getWishlist()
    }, [])


  return <>
    <Helmet>
        <title>WishList</title>
      </Helmet>

    <div className="container bg-body-tertiary my-5 p-4">
        <h3 className='fw-bold' >My Wish List</h3>

        {wishList? wishList.map((item)=> <div className="row p-3 align-items-center border-bottom">
            <div className="col-md-3 ">
              <img src={item.imageCover} className='w-100' alt="" />
            </div>
            <div className="col-md-9 mt-4">
              <h2 className="h4">{item.title}</h2>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <span className='text-main'>price : {item.price}  EGP</span>
                <button onClick={()=> addProductToCart(item.id)} className='btn border-btn'>add to cart</button>
              </div>
              <button
                    onClick={()=> removeUserItem(item.id)}
                    className="btn p-0"
                  >
                    <i className="fa-solid fa-trash-can text-danger me-2"></i>
                    Remove
                  </button>
            </div>
        </div>):''}
    </div>
  </>
}
