import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from "../components/VerticalCard"

const SearchProduct = () => {
    const query = useLocation()
    const [data,setData]=useState([])
    const [loading,setLoading] = useState(false)
    console.log("query", query.search)

    const fetchProduct = async() =>{
      setLoading(true)
        const response = await fetch(SummaryApi.SearchProduct.url+query.search)
        const dataResponse = await response.json()
        setLoading(false)

        setData(dataResponse.data)

        
    }
    useEffect(()=>{
        fetchProduct()
    },[query])
  return (
    <div className='container mx-auto p-4'>
        <br />
        <br />
        <div className='text-center mb-6'>
                <h1 className='text-2xl font-semibold'>Search Results</h1>
                <p className='text-gray-600'>Found {data.length} results</p>
            </div>
      {
        loading && (
          <p className='text-lg text-center'>Loading....</p>
        )
      }
     
     {
      data.length === 0 && !loading && (
            <p className='bg-white text-lg  text-center p-4'>No Data Found....</p>
      )
     }
     {data.length !==0 && !loading && (
          
            <VerticalCard loading={loading} data={data} />
      ) 
      
     }
    </div>
  )
}

export default SearchProduct
