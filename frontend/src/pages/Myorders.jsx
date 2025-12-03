import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/Appcontex'
import { dummyOrders } from '../assets/assets'

const Myorders = () => {

const [myorders,setMyorders]=useState([])
  const {currency}=useAppContext()
  const fetchmyordes=async()=>{
setMyorders(dummyOrders)
  }
useEffect(()=>{
    fetchmyordes()
},[])

  return (
    <div className='mt-16 pb-16'>
        
    <div className='flex flex-col items-end w-max mb-8'>
    <p className='text-2xl font-medium uppercase'>My orders</p>
    <div className='w-16 h-0.5 bg-primary rounded-full'>

    </div>
    </div>


{myorders.map((order,index)=>(
    <div>
        <p>
            <span>OrderId:{order._id}</span>
             <span>payment:{order.paymenttype}</span>
              <span>total amounnt:{currency}{order.amount}</span>
        </p>
    </div>
))}





    </div>
  )
}

export default Myorders