import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">About Us</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img src="/fathima.jpg" alt="Fathima Shamsudheen" className="w-full max-w-md mx-auto rounded-lg" />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h3 className="text-2xl font-bold mb-4">Meet the Artist</h3>
            <h4 className="text-xl font-semibold mb-2">Fathima Shamsudheen - Owner, Founder & Lead Artist</h4>
            <p className="text-gray-600 mb-4">
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying
              out print, graphic or web designs. The passage is attributed to an unknown
              typesetter in the 15th century who is thought to have scrambled parts of
              Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It
              usually begins with:
            </p>
            <p className="text-gray-600">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
              in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;