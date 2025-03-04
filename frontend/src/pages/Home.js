import React from 'react';
import CategoryList from '../components/CategoryList';
import BannerProducts from '../components/BannerProducts';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from "../components/verticalCardProduct";
import Navbar from "../components/Navbar";
import image5 from '../assest/giphy.gif'; // Import the image
import image6 from '../assest/D-LOYALTY-BANNER.jpg';
import image7 from '../assest/PALETTE-ICY-NUDE-1.jpg';
function Home() {
  return (
    <div>
      <Navbar />
      <BannerProducts />
      <CategoryList />
      <HorizontalCardProduct category={["Foundation", "Blush", "Highlighter", "Lip Gloss"]} heading={"Best Sellers"} />
      <HorizontalCardProduct category={"Lip Gloss"} heading={"Top's Lip Gloss"} />

      {/* Section for the new image */}
      <div className=' py-10'>
        <div className='h-full w-full flex justify-center items-center'>
        <img
            src={image7} // Add the imported image here
            alt="GIF Animation"
            className='w-1/3 md:w-1/4 h-auto object-contain shadow-lg rounded-lg' // Adjust width, height, and apply shadow
          />
          <img
            src={image5} // Add the imported image here
            alt="GIF Animation"
            className='w-1/3 md:w-1/4 h-auto object-contain shadow-lg rounded-lg' // Adjust width, height, and apply shadow
          />
           <img
            src={image7} // Add the imported image here
            alt="GIF Animation"
            className='w-1/3 md:w-1/4 h-auto object-contain shadow-lg rounded-lg' // Adjust width, height, and apply shadow
          />
        </div>
      </div>

      <VerticalCardProduct category={"Eyeshadow"} heading={"Eyeshadow"} />
      
      {/**<div className='bg-[#eb3986]'>
      <div className='h-full md:h-80 w-full bg-bg-[#eb3986] relative overflow-hidden'>
        <div className='absolute inset-0 flex'>
          <img 
            src={image6} 
            
            className='w-full h-80 object-cover'
          />
        </div>
      </div>
    </div> */}
      

    </div>
  );
}

export default Home;
