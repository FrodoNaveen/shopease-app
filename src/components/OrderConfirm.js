import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const OrderConfirm = () => {

    const navigate = useNavigate()

    useEffect(()=>{
       setTimeout(()=>{
          navigate("/header")
       },5000)
    },[])
  return (
    <div>
      <div className='confirmation'>
        <h1>Order Confirmed!!!</h1>
      </div>
    </div>
  );
}

export default OrderConfirm