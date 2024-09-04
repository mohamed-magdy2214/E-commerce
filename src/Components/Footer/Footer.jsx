import React from 'react';
import style from './Footer.module.css'
import masterCard from '../../assets/payment logos/mastercard-logo-vector-1.svg';
import paypal from '../../assets/payment logos/paypal.png';
import amazon from '../../assets/payment logos/Amazon_Pay-Logo.wine.png';

export default function Footer() {
  return <>
    <footer className='py-4 bg-body-tertiary'>
      <div className="container">
          <div className="title">
            <h2>Get the FreshCart App</h2>
            <p className='text'>we will send you a link, open it on your phone to download the app</p>
          </div>
        <div className="form">
          <div className="row">
            <div className="col-md-10">
              <input className='p-2 bg-white rounded-2 w-100 mb-2' type="email" name="email" placeholder='Email....' />
            </div>
            <div className="col-md-2">
              <button className='btn bg-main text-white w-100 rounded-2'>Share App Link</button>
            </div>
          </div>
        </div>
        <div className="content d-flex justify-content-between  py-3 mt-4">
          <div className="payment w-25">
            <span className='me-2'>Payment Partners</span>
            <img src={masterCard} className='img-logo me-2' alt="mastercard logo" />
            <img src={paypal} className='img-logo me-2' alt="paypal logo" />
            <img src={amazon} className='img-logo me-2' alt="amazon logo" />
          </div>
          <div className="download w-25 text-center">
            <span>Get deliveries with FreshCart</span>
          </div>
        </div>
      </div>
    </footer>
  </>
}
