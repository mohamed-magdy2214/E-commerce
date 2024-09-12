import React, { useContext, useState } from 'react';
import style from './Login.module.css'
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import { UserContext } from '../../Context/UserContext';


export default function Login() {

  let {setUserToken} = useContext(UserContext)

  let navigate = useNavigate ()
  const [error, seterror] = useState('')
  const [isLoading, setisLoading] = useState(false)

  async function submitLogin(values) {
    
    setisLoading(true)

    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values)
    .catch((err) => {
      setisLoading(false)
      seterror(err.response.data.message)
    })

    if(data.message === 'success') {
      setisLoading(false);
      localStorage.setItem('userToken' , data.token);
      setUserToken(data.token)
      navigate('/')
    }
  }

  let validationSchema = yup.object({
    email: yup.string().email('email is in valid').required('email is required'),
    password: yup.string().matches(/^[A-Z][A-Za-z\d]{7,}$/ , 'password msut be more than 8 character, first character is uppercase').required('password is required'),
  })

let formik = useFormik({
  initialValues:{
    email: '' ,
    password: '' , 
  },
  validationSchema,
  onSubmit:submitLogin
})

  return <>
    <div className="w-75 py-4 mx-auto">

      {error !== '' ? <div className="alert alert-danger p-2 text-center">{error}</div> : ''}

      <h2 className='mt-2'>Login:</h2>

      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="email">email:</label>
        <input type="email" name="email" id="email" className='form-control p-2 mb-2'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        />

        {formik.errors.email && formik.touched.email? <div className='alert alert-danger p-2'>{formik.errors.email}</div> : ''}

        <label htmlFor="password">password:</label>
        <input type="password" name="password" id="password" className='form-control p-2 mb-2'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        />

        {formik.errors.password && formik.touched.password? <div className='alert alert-danger p-2'>{formik.errors.password}</div> : ''}


        {isLoading === false ? <>

          <button type='submit' className='btn bg-main text-white mb-2' disabled={!(formik.isValid && formik.dirty)}>Login</button>
          <Link to={'/register'} className='btn'>Register Now</Link>
        </> : <button type='button' className='btn bg-main text-white mb-2'>
          <Audio
              height="20"
              width="30"
              color="white"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
        </button>}
        

      </form>
    </div>
  </>
}
