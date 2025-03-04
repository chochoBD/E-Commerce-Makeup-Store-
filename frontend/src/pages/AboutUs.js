import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-[#505152] text-white py-16 px-8 lg:px-32">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="text-lg mb-8">
          Welcome to our company! We are dedicated to providing you with the best products and services to meet your needs.
          With a passion for quality and customer satisfaction, we strive to exceed expectations and deliver exceptional value.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <div className="bg-[#646566] text-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
          <p>
            To create a seamless shopping experience by offering quality products, dedicated customer support, and competitive pricing.
          </p>
        </div>
        
        <div className="bg-[#646566] text-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
          <p>
            To become a leader in our industry, setting standards of excellence in service and innovation.
          </p>
        </div>
        
        <div className="bg-[#646566] text-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-2">Our Values</h3>
          <ul className="list-disc list-inside">
            <li>Integrity</li>
            <li>Quality</li>
            <li>Innovation</li>
            <li>Customer Focus</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
