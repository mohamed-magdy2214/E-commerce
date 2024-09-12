import React from 'react';
import style from './NotFound.module.css';
import cover from '../../assets/images/error.svg'

export default function NotFound() {
  return <>
    <div className="py-4 w-75 mx-auto">
      <img src={cover} alt="error" className="w-100" />
    </div>
  </>
}
