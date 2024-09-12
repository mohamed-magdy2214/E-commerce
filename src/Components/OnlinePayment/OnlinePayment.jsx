import React, { useContext } from 'react';
import style from './OnlinePayment.module.css'
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';

export default function OnlinePayment() {

  let {onlinePayment , cartId} = useContext(CartContext)
  
  async function handleSubmit(values) {

    let {data} = await onlinePayment(cartId , values)
    window.location.href= data.session.url;
    console.log(data);
  }

  let formik = useFormik({
    initialValues:{
      details: '',
      phone: '',
      city: ''
    },
    onSubmit:handleSubmit

  })
  return <>
    <div className="py-4 w-75 mx-auto">
        <h3 className='fw-bold mb-3'>Payment Details:</h3>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="details">details:</label>
        <input type="text" name="details" id="details" className='form-control mb-2 p-2'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.details}
        />

        <label htmlFor="phone">phone:</label>
        <input type="tel" name="phone" id="phone" className='form-control mb-2 p-2'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />

        <label htmlFor="city">city:</label>
        <input type="text" name="city" id="city" className='form-control mb-2 p-2'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        />

        <button type='submit' className='btn bg-main text-white'>Checkout</button>

      </form>
    </div>
  </>
}
