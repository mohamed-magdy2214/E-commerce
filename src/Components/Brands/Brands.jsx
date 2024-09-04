import React from 'react';
import style from './Brands.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Audio } from 'react-loader-spinner';

export default function Brands() {

  function getAllCategories() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  
  let {data , isLoading} = useQuery('getAllCategories' , getAllCategories);
  let categories = data?.data.data;

  return <>
    {isLoading? <div className='py-4 d-flex justify-content-center bg-main-light'>
      <Audio
              height="100"
              width="100"
              color="#0F67B1"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
    </div>: <div className='py-4 row gy-4 mx-4 bg-main-light'>
      {categories.map((category)=> <div key={category._id} className='col-md-2 rounded-2'>
        <img className='w-100 rounded-2' height={300} src={category.image} alt="" />
        <div className="description p-2">
          <h2 className="h3 text-center fw-bold">{category.name}</h2>
        </div>
      </div>)}
    </div> }
  </>
}
