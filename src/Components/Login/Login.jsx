import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import {ThreeCircles} from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext/UserContext';




export default function Login() {

  let {setUserToken} = useContext(UserContext);
  

  let navigate = useNavigate();
  let [error, setError] = useState(null)
  let [isLoading, setIsLoading] = useState(false)

  async function loginSubmit(values){
    setIsLoading(true)
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err)=>{
      setIsLoading(false)
      setError(err.response.data.message)
    })
    
    if(data.message === 'success'){
      setIsLoading(false)
      localStorage.setItem('userToken', data.token)
      setUserToken(data.token)
      navigate('/')
    }
  }


  let validateScheme = yup.object({
    email: yup.string().email('email is invalid').required('name is required'),
    password: yup.string().matches(/[A-Z][a-z0-9]{5,10}/, 'password is invalid').required('password . required'),
    })


let formik = useFormik({
  initialValues:{
    email:'',
    password:'',
  },
  validationSchema:validateScheme,
  onSubmit:loginSubmit
})


  return <>
    <div className="w-75 mx-auto py-3">
      {error?<div className="alert alert-danger p-2">{error}</div>:''}
      
      
      <h2>Login Now :</h2>

      <form onSubmit={formik.handleSubmit}>


        <label htmlFor="email">email :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className='form-control mb-3' />

        {formik.errors.email && formik.touched.email?<div className="alert alert-danger p-2">{formik.errors.email}</div>:''}

        <label htmlFor="password">password :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className='form-control mb-3' />

        {formik.errors.password && formik.touched.password?<div className="alert alert-danger p-2">{formik.errors.password}</div>:''}
        

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
        </button>:<>
        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white me-2'>Login</button>
        <Link to='/register'>Register Now</Link>
        </>
}
        
        


      </form>
    </div>
  </>
  }
