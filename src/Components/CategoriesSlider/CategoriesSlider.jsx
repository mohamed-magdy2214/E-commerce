import axios from 'axios'
import React from 'react'
import Slider from "react-slick";
import { useQuery } from 'react-query'

export default function CategoriesSlider() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
      };

    function getCategory(){

        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    let {data} = useQuery('categorySlider', getCategory)

  return <>

          <div className="container">
            <div className="py-5">
                <h2 className='h4n'>Shop Popular Categories</h2>
                {data?.data.data? <Slider {...settings}>
                    {data?.data.data.map((category)=> <img height={200} src={category.image} alt='slider img'/>)}
                </Slider>:''}
            </div>
          </div>
  </>
}
