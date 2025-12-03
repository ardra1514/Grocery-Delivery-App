import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/Appcontex'
import Productcard from '../components/Productcard'

const Allproducts = () => {
    const {products,searchquery}=useAppContext()
    const [filteredproduct ,setFilteredproduct]=useState([])


useEffect(()=>{
  if(searchquery.length>0){
    setFilteredproduct(products.filter(
      product=>product.name.toLowerCase().includes(searchquery.toLowerCase())
    ))
  }else{
    setFilteredproduct(products)
  }
},[products,searchquery])




  return (
    <div className='mt-16 flex flex-col'>
        <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>All products</p>
            <div className='w-16 h-0.5 bg-primary rounded-full '>

            </div>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
    {filteredproduct.filter((product)=>product.inStock).map((product,index)=>(
<Productcard key={index} product={product} />
    ))}

            </div>

    </div>
  )
}

export default Allproducts