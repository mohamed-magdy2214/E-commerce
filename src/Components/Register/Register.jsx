import React, { useState } from 'react';
import style from './Register.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';

export default function Register() {

  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function registerSubmit(values) {

    setIsLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
    .catch((err)=> {
      setIsLoading(false);
      seterror(err.response.data.message);
    })

    if(data.message === 'success') {
      setIsLoading(false);
      navigate('/Login')
    }
  }


  let validationSchema = yup.object({
    name: yup.string().min(3, 'name must be longer than 3 characters').max(15 , 'name must be shorter than 15 characters').required('name is required'),
    email: yup.string().email('Invalid email').required('email is required'),
    password: yup.string().matches(/^[A-Z][A-Za-z\d]{7,}$/ , 'password msut be more than 8 character, first character is uppercase').required('password is required'),
    rePassword: yup.string().oneOf([yup.ref('password')], "password and repassword don't match").required('repassword is required'),
    phone: yup.string().matches(/^01[0-2,5][0-9]{8}$/ ,'Invalid phone number').required('phone is required')
  })

  let formik = useFormik({
    initialValues:{
      name: '' ,
      email: '' ,
      password: '' ,
      rePassword: '',
      phone: ''

    }, validationSchema ,
    onSubmit: registerSubmit
  })

  return <>
    <div className="w-75 mx-auto mt-4">

      {error !== null? <div className="alert alert-danger p-2 text-center">{error}</div>: ''}
      
      <form onSubmit={formik.handleSubmit}>
        <h2>Register Now</h2>

        <label htmlFor="name">name:</label>
        <input
          type="text" name="name" id="name" className="form-control mb-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}/>

          {formik.errors.name && formik.touched.name ? <div className='p-2 alert alert-danger'>{formik.errors.name}</div>: ''}

        <label htmlFor="email">email:</label>
        <input
          type="email" name="email" id="email" className="form-control mb-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}/>

          {formik.errors.email && formik.touched.email ? <div className='p-2 alert alert-danger'>{formik.errors.email}</div>: ''}


        <label htmlFor="password">password:</label>
        <input
          type="password" name="password" id="password" className="form-control mb-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}/>

          {formik.errors.password && formik.touched.password ? <div className='p-2 alert alert-danger'>{formik.errors.password}</div>: ''}

        <label htmlFor="rePassword">rePassword:</label>
        <input
          type="password" name="rePassword" id="rePassword" className="form-control mb-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rePassword}/>

          {formik.errors.rePassword && formik.touched.rePassword ? <div className='p-2 alert alert-danger'>{formik.errors.rePassword}</div>: ''}

        <label htmlFor="phone">phone:</label>
        <input
          type="tel" name="phone" id="phone" className="form-control mb-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}/>

          {formik.errors.phone && formik.touched.phone ? <div className='p-2 alert alert-danger'>{formik.errors.phone}</div>: ''}


          {isLoading? <button type='button' className='btn bg-main text-white my-2'>
            <Audio
              height="20"
              width="30"
              color="white"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
          </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white my-2'>Register</button>} 
          
      </form>
    </div>
  </>
}
