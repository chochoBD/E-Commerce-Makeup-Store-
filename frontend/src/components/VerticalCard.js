import React, { useContext } from 'react'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { Link } from 'react-router-dom'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'

const VerticalCard = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center gap-4 md:gap-6 p-4 overflow-x-scroll scrollbar-none transition-all'>
            {loading ? (
                loadingList.map((_, index) => (
                    <div
                        key={index}
                        className='w-full min-w-[280px] md:min-w-[320px] max-w-[320px] bg-white rounded-lg shadow-md animate-pulse'
                    >
                        <div className='bg-slate-200 h-48 p-4 flex justify-center items-center rounded-t-lg' />
                        <div className='p-4 grid gap-3'>
                            <div className='h-4 bg-slate-200 rounded-full w-3/4'></div>
                            <div className='h-3 bg-slate-200 rounded-full w-1/2'></div>
                            <div className='flex gap-3'>
                                <div className='h-3 bg-slate-200 rounded-full w-1/3'></div>
                                <div className='h-3 bg-slate-200 rounded-full w-1/3'></div>
                            </div>
                            <button className='h-8 bg-slate-200 rounded-full'></button>
                        </div>
                    </div>
                ))
            ) : (
                data.map((product, index) => (
                    <Link
                        to={`/product/${product?._id}`}
                        key={index}
                        onClick={scrollTop}
                    >
                        <div className='h-40 w-full flex items-center justify-center  rounded-lg overflow-hidden'>
                            <img
                                src={product.productImages[0]}
                                alt={product?.productName}
                                className='object-contain h-full w-full transition-transform duration-300 hover:scale-105'
                            />
                        </div>
                        <div className='my-4'>
                            <h2 className='text-sm font-semibold text-[#333] line-clamp-1'>{product?.productName}</h2>
                            <p className='text-xs text-gray-500 mt-1 capitalize'>{product?.category}</p>
                            <div className='flex items-center gap-2 mt-2'>
                                <p className='text-sm font-bold text-[#eb3986]'>{displayINRCurrency(product?.selling)}</p>
                                <p className='text-sm text-gray-500 line-through'>{displayINRCurrency(product?.price)}</p>
                            </div>
                            <button
                                className='mt-4 w-full text-xs py-2 bg-[#eb3986]  text-white px-5 font-medium rounded-full shadow-md 
                                hover:scale-105 transform transition duration-300 ease-in-out'
                                onClick={(e) => handleAddToCart(e, product?._id)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </Link>
                ))
            )}
        </div>
    )
}

export default VerticalCard
