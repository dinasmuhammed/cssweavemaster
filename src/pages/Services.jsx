import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const ServicePackage = ({ title, images, details, buttonText }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold text-green-800 mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {images.map((src, index) => (
        <img key={index} src={src} alt={`${title} design ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
      ))}
    </div>
    <ul className="list-disc list-inside mb-4">
      {details.map((detail, index) => (
        <li key={index} className="text-green-700">{detail}</li>
      ))}
    </ul>
    <Button asChild className="bg-green-800 hover:bg-green-700 text-white">
      <Link to="/contact">{buttonText}</Link>
    </Button>
  </div>
);

const Services = () => {
  const services = [
    {
      title: "BRIDAL & ENGAGEMENT HENNA",
      images: [
        "https://i.postimg.cc/Xq8Q3QZY/bridal-1.jpg",
        "https://i.postimg.cc/3x7Lkc5f/bridal-2.jpg",
        "https://i.postimg.cc/Xq8Q3QZY/bridal-1.jpg",
      ],
      packages: [
        {
          name: "SILVER PACKAGE",
          details: [
            "Hands (both sides)",
            "Includes both hands up to wrist sides",
            "Includes Henna Care Aftercare",
            "1-2 Hours with Natural Application",
          ],
          buttonText: "Enquire for Price",
        },
        {
          name: "GOLD PACKAGE",
          details: [
            "Hands (Front & Back)",
            "Includes both hands up to mid-forearm",
            "Includes Henna Care Aftercare",
            "2-3 Hours with Natural Application",
          ],
          buttonText: "Enquire for Price",
        },
        {
          name: "PLATINUM PACKAGE",
          details: [
            "Hands, Feet & Legs",
            "Includes both hands up to mid-forearm",
            "Includes Henna Care Aftercare",
            "3-4 Hours with Natural Application",
          ],
          buttonText: "Enquire for Price",
        },
      ],
    },
    {
      title: "PARTY HENNA",
      images: [
        "https://i.postimg.cc/L8QSRZnb/party-1.jpg",
        "https://i.postimg.cc/L8QSRZnb/party-1.jpg",
        "https://i.postimg.cc/L8QSRZnb/party-1.jpg",
      ],
      packages: [
        {
          name: "SIMPLE DESIGNS",
          details: [
            "15-20 Minutes per hand",
            "1-2 Hours with Natural Application",
          ],
          buttonText: "Enquire for Price",
        },
        {
          name: "HEAVY DESIGNS",
          details: [
            "Includes Henna Care Aftercare",
            "2-3 Hours with Natural Application",
          ],
          buttonText: "Enquire for Price",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Our Services</h1>
      {services.map((service, index) => (
        <div key={index} className="mb-16">
          <h2 className="text-2xl font-bold text-green-800 mb-4">{service.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {service.images.map((src, imgIndex) => (
              <img key={imgIndex} src={src} alt={`${service.title} ${imgIndex + 1}`} className="w-full h-48 object-cover rounded-lg" />
            ))}
          </div>
          {service.packages.map((pkg, pkgIndex) => (
            <ServicePackage
              key={pkgIndex}
              title={pkg.name}
              images={service.images}
              details={pkg.details}
              buttonText={pkg.buttonText}
            />
          ))}
        </div>
      ))}
      <p className="text-sm text-green-700 italic mt-8">
        Note : The final amount depends on the complexity of the design and the customer's requirements.<br />
        The total price will be finalized after the work is completed.
      </p>
    </div>
  );
};

export default Services;