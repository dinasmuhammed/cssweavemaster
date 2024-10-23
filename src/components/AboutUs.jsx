import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-green-800 mb-6 sm:mb-8 md:mb-12">About Us</h2>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="w-full md:w-1/2">
            <img 
              src="https://i.postimg.cc/wBxJsq1n/image.png" 
              alt="Fathima Shamsudheen" 
              className="w-full max-w-md mx-auto rounded-lg shadow-md object-cover aspect-square sm:aspect-auto"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-4 lg:pl-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Meet the Artist</h3>
            <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">Fathima Shamsudheen - Owner, Founder & Lead Artist</h4>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              At Henna by Fathima, we believe that just as everyone deserves a diamond, henna is an essential part of joy and celebration. Our passion lies in adorning hands with rich, deep red designs, symbolizing companionship, new beginnings, and the simple pleasure of henna art.
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              We are dedicated to providing a personalized experience tailored to each of our clients. From high-quality products and exceptional services to hands-on workshops, Henna by Fathima adds a touch of beauty and sweetness to every occasion, ensuring that your special moments are truly unforgettable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;