import React, { useState } from 'react'
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import ProductCategory from '../helpers/ProductCategory'
import { MdCloudUpload } from 'react-icons/md';
import uploadImages from '../helpers/uploadImages'
import DisplayImage from '../components/DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common/index"
import { toast } from 'react-toastify';



function UploadProduct({
    onClose
    , fetchData
}) {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImages: [],
        description: "",
        price: "",
        selling: "",
    });
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullscreenImage, setFullscreenImage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })

    };
    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImages(file)
        setData((preve) => {
            return {
                ...preve,
                productImages: [...preve.productImages, uploadImageCloudinary.url]
            }
        })

    };

    const handDeleteProductImage = async (index) => {
        console.log("index ", index)
        const newProductImages = [...data.productImages]
        newProductImages.splice(index, 1)
        setData((preve) => {
            return {
                ...preve,
                productImages: [...newProductImages]
            }
        })
    }
    /** submit */
    const handlSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const fetchdata = await fetch(SummaryApi.uploadProduct.url, {
                method: SummaryApi.uploadProduct.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
    
            const response = await fetchdata.json();
    
            if (response.success) {
                toast.success("Product uploaded successfully!");
                setData({
                    productName: "",
                    brandName: "",
                    category: "",
                    productImages: [],
                    description: "",
                    price: "",
                    selling: "",
                });
                onClose(); // Close the form if needed
                fetchData()
            } else {
                throw new Error(response.message || 'Failed to upload product');
            }
        } catch (error) {
            toast.error(error.message || "An error occurred");
        }
    };
    
    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded  w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-bold text-lg'>Upload Product</h1>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <FaTimes size={20} />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={ handlSubmit } >
                    {/* Product Name */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="productName">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={data.productName}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter product name"
                            required
                        />
                    </div>
                    {/* Brand Name */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="brandName">
                            Brand Name
                        </label>
                        <input
                            type="text"
                            id="brandName"
                            name="brandName"
                            value={data.brandName}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter brand name"
                            required
                        />
                    </div>
                    {/* Category Select */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={data.category}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        >
                            <option value={''} >Select Category
                            </option>
                            {ProductCategory.map((el, index) => (
                                <option value={el.value} key={el.value + index}>
                                    {el.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Product Image Upload (Multiple) */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="productImages">
                            Upload Product Images
                        </label>
                        <div className="p-2 bg-gray-100 border rounded-lg h-40 w-full flex justify-center items-center relative border-gray-300 focus-within:ring-2 focus-within:ring-black">
                            <input
                                type="file"
                                id="productImages"
                                accept="image/*"
                                multiple
                                onChange={handleUploadProduct}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="text-gray-500 flex justify-center items-center flex-col gap-2">
                                <MdCloudUpload size={40} />
                                <p className="text-sm">Click to upload images</p>
                            </div>

                        </div>

                    </div>
                    <div>
                        {
                            data?.productImages[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.productImages.map((el, index) => {
                                            return (
                                                <div className='relative group'>
                                                    <img
                                                        src={el}
                                                        alt='el'
                                                        width={80}
                                                        height={80}
                                                        className='bg-slate-100 border cursor-pointer'
                                                        onClick={() => {
                                                            setOpenFullScreenImage(true)
                                                            setFullscreenImage(el)

                                                        }}
                                                    />
                                                    <div className='absolute bottom-0 right-0 p-1 bg-red-600 text-white rounded-full hidden cursor-pointer group-hover:block ' onClick={() => handDeleteProductImage(index)}>
                                                        <MdDelete />
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                                </div>

                            ) : (
                                <p>No images uploaded</p>

                            )
                        }



                    </div>
                    {/* Price */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter price"
                            required
                        />
                    </div>
                    {/* Selling Price */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="selling">
                            Selling Price
                        </label>
                        <input
                            type="number"
                            id="selling"
                            name="selling"
                            value={data.selling}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter selling price"
                            required
                        />
                    </div>
                    {/* Description */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter product description"
                            rows="4"
                            required
                        ></textarea>
                    </div>



                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-300"
                        >
                            Upload Product
                        </button>
                    </div>

                </form>
            </div>
            {/** display image full screen */}
            {
                openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullscreenImage} />
                )
            }

        </div>

    )
}

export default UploadProduct

















