import React from 'react'
import img from '../../Assets/images/error.svg'

export default function NotFound() {
  return <>
    <div className="container">
      <div className="row">
        <div className="img">
          <img src={img} className='w-100' alt="" />
        </div>
      </div>
    </div>
  </>
}
