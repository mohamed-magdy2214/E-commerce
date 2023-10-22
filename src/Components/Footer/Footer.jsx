import React from 'react'

export default function Footer() {
  return <>
    <div className="footer bg-body-tertiary p-5">
      <h3>Get the FreshCart app</h3>
      <p>we will send tou a links, open iy in your phone to download the app</p>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <input className='form-control' type="email" placeholder='Email'/>
          </div>
          <div className="col-md-2">
            <button className='btn text-white bg-main '>Share App link</button>
          </div>
        </div>
      </div>
    </div>
  </>
}
