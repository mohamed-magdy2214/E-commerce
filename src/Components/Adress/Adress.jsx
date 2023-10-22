import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'


export default function Adress() {

    let {onlinePayment, cartId} = useContext(CartContext);

    async function handleAdress(values){
        
        let response = await onlinePayment(cartId, values);
        window.location.href = response.data.session.url
    }

    let formik = useFormik({
        initialValues: {
            details:'',
            phone: '',
            city: ''
        },
        onSubmit:handleAdress
    })

  return <>
    <form onSubmit={formik.handleSubmit} className='w-75 mx-auto min-vh-100 mt-5'>

        <label htmlFor="details">Details :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} className='form-control py-2 mb-3' type="text" name="details" id="details" />
    
        <label htmlFor="phone">Phone :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='form-control py-2 mb-3' type="tel" name="phone" id="phone" />

        <label htmlFor="city">City :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} className='form-control py-2 mb-3' type="text" name="city" id="city" />    

        <button type='submit' className='btn bg-main text-white'>Pay Now</button>
    
    </form>

  </>
}
