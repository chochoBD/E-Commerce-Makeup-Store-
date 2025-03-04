import React from "react";
import { FaPhoneAlt, FaTruck } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#646566] py-8 shadow-md">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-2 p-2">
        
        {/* Free Shipping Message with Icon */}
        <div className="flex items-center justify-center md:justify-start space-x-1 gap-2">
          <FaTruck className="text-white text-5xl" />
          <p className="text-lg font-semibold text-white ">Free Shipping on orders over 1000 MAD</p>
        </div>
        
        {/* Contact Section */}
        <div className="flex items-center justify-center md:justify-end space-x-1 gap-2">
          <FaPhoneAlt className="text-white  text-5xl" />
          <p className="text-base font-medium text-white ">Call us! Toll-free +212 630393847</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
