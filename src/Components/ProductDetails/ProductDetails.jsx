import React, { useContext } from 'react';
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';


export default function ProductDetails() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  let params = useParams();

  let {addToCart , setNumOfCartItems } = useContext(CartContext);

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

  function getProductDetails(id) {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  let {data} = useQuery('productDetails' , () => getProductDetails(params.productId));
  let productDetails = data?.data.data;
    return <>
    {productDetails? <div className="p-2 mx-5">
      <div className="row align-items-center">
        <div className="col-md-4 ">
          <Slider {...settings}>
            <img src={productDetails.images[0]} alt="" />
            <img src={productDetails.images[1]} alt="" />
            <img src={productDetails.images[2]} alt="" />
            <img src={productDetails.images[3]} alt="" />
            
          </Slider>
        </div>
        <div className="col-md-8">
          <h2 className="h4 mb-3">{productDetails.title}</h2>
          <h2 className="h4 mb-3">{productDetails.description}</h2>
          <h2 className="h6 text-main">{productDetails.category.name}</h2>
          <div className="d-flex justify-content-between my-3">
            <span className="price text-main fw-bold">
              price: {productDetails.price} EGP
            </span>
            <span className='rating'>
              <i className='fa fa-star rating-color me-2'>{productDetails.ratingsAverage}</i>
            </span>
          </div>
          <button onClick={()=> addProductToCart(productDetails._id)} className='btn bg-main text-white w-100'>Add to Cart</button>
        </div>
      </div>
    </div> : ''}
  </>
}
