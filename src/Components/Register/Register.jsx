import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import {ThreeCircles} from 'react-loader-spinner'


export default function Register() {

  let navigate = useNavigate()
  let [error, setError] = useState(null)
  let [isLoading, setIsLoading] = useState(false)

  async function registerSubmit(values){
    setIsLoading(true)
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch((err)=>{
      setIsLoading(false)
      setError(err.response.data.message)
    })
    
    if(data.message === 'success'){
      setIsLoading(false)
      navigate('/login')
    }
  }

  let phoneRegex = /^01[0125][0-9]{8}$/;

  let validateScheme = yup.object({
    name: yup.string().min(3, 'name minlength is 3').max(15, 'name maxlength is 15').required('name is required'),
    email: yup.string().email('email is invalid').required('name is required'),
    phone: yup.string().matches(phoneRegex, 'phone is invalid').required('phone is required'),
    password: yup.string().matches(/[A-Z][a-z0-9]{5,10}/, 'password is invalid').required('password . required'),
    rePassword: yup.string().oneOf([yup.ref('password')], 'password and rePassword not match').required()
    })


let formik = useFormik({
  initialValues:{
    name:'',
    email:'',
    password:'',
    rePassword:'',
    phone:'',
  },
  validationSchema:validateScheme,
  onSubmit:registerSubmit
})


  return <>
    <div className="w-75 mx-auto py-3">
      {error?<div className="alert alert-danger p-2">{error}</div>:''}
      
      
      <h2>Register Now :</h2>

      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="name">name :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className='form-control mb-3' />
        
          {formik.errors.name && formik.touched.name?<div className="alert alert-danger p-2">{formik.errors.name}</div>:''}
          

        <label htmlFor="email">email :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className='form-control mb-3' />

        {formik.errors.email && formik.touched.email?<div className="alert alert-danger p-2">{formik.errors.email}</div>:''}

        <label htmlFor="password">password :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className='form-control mb-3' />

        {formik.errors.password && formik.touched.password?<div className="alert alert-danger p-2">{formik.errors.password}</div>:''}
        
        <label htmlFor="rePassword">rePassword :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className='form-control mb-3' />

        {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger p-2">{formik.errors.rePassword}</div>:''}
        
        <label htmlFor="phone">phone :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className='form-control mb-3' />

        {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger p-2">{formik.errors.phone}</div>:''}
        

        {isLoading?<button  type='button' className='btn bg-main text-white'>
        <ThreeCircles
          height="20"
          width="20"
          color="#fff"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
        </button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>
}
        
        


      </form>
    </div>
  </>
  }
