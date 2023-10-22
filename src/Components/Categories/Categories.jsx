import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet';
import { Audio } from "react-loader-spinner";
import { useQuery } from 'react-query';

export default function Categories() {

  
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data } = useQuery("getCategories", getCategories);

  return <>
  <Helmet>
        <title>Categories</title>
      </Helmet>
    {data?.data.data? <>
      <div className="container my-4">
        <div className="row g-4">
          {data?.data.data.map((category)=> <div className='col-md-4 p-0 px-2'>
            <div className="card card-shadow">
              <div className="image">
                <img src={category.image} height={500} className='w-100' alt="" />  
              </div>
              <div className="title p-4 text-center">
                <h3>{category.name}</h3>
              </div>
            </div>
          </div>)}
        </div>
      </div>
    </>: <div className="d-flex justify-content-center align-items-center pt-5">
              <h1>
                <Audio
                  height="100"
                  width="100"
                  color="#4fa94d"
                  ariaLabel="audio-loading"
                  wrapperStyle={{}}
                  wrapperClass="wrapper-class"
                  visible={true}
                />
              </h1>
            </div>}
  </>
}
