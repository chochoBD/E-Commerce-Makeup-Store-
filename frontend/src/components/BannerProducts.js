import React, { useEffect, useState } from 'react';
import image1 from '../assest/banner/D-A1-YUM-BOUJEE-GIF.webp';
import image2 from '../assest/banner/WITHOUT-EB-1-D.jpg';
import image3 from '../assest/banner/D-PLP-HEADER-ICY-NUDE.jpg';

import image1Mobile from '../assest/banner/WhatsApp Image 2024-12-02 à 09.45.22_05454f9a.jpg';


const BannerProducts = () => {
  const DesktopImages = [
    image1,
    image2,
    image3
  ];
  
  const MobileImages = [
    image1Mobile,
   
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [images, setImages] = useState(DesktopImages);

  const updateImageArray = () => {
    if (window.innerWidth <= 768) {
      setImages(MobileImages);
    } else {
      setImages(DesktopImages);
    }
  };

  useEffect(() => {
    updateImageArray();
    window.addEventListener('resize', updateImageArray);
    
    const interval = setInterval(() => {
      setFade(false); // Start fade-out and rotation
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Change image
        setFade(true); // Start fade-in and rotation reset
      }, 500); // Match this duration with your fade-out duration
    }, 3000); // Change image every 3 seconds

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateImageArray);
    };
  }, [images.length]);

  return (
    <div className='bg-[#eb3986]'>
      <div className='h-full md:h-80 w-full bg-bg-[#eb3986] relative overflow-hidden'>
        <div className='absolute inset-0 flex'>
          <img 
            src={images[currentImageIndex]} 
            alt={`Banner ${currentImageIndex + 1}`} 
            style={{
              opacity: fade ? 1 : 0,
              transform: fade ? 'scale(1) rotate(0deg)' : 'scale(1.05) rotate(10deg)', // Rotate and scale effect
              transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out' // Smooth transition for scaling and rotating
            }}
            className='w-full h-80 object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default BannerProducts;
