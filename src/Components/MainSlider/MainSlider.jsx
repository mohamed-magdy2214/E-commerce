import React from 'react';
import style from './MainSlider.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      }
    ]
  };

  function getAllCategories() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  
  let {data , isLoading} = useQuery('getAllCategories' , getAllCategories);
  let categories = data?.data.data;
  
  return <>
  {categories? <Slider {...settings}>
        {categories.map((category)=> <img height={300} key={category._id} src={category.image} className='w-100 my-4'></img>)}
        </Slider> : ''}
  </>
}
