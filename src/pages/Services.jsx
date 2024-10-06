import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: 'Bridal Henna',
    description: 'Exquisite and intricate designs for your special day.',
    image: 'https://i.postimg.cc/FRRFYbt1/Screenshot-2024-10-06-101248.png',
  },
  {
    title: 'Party Henna',
    description: 'Beautiful designs for all your celebrations and events.',
    image: 'https://i.postimg.cc/3JDXym7L/Screenshot-2024-10-06-101639.png',
  },
  {
    title: 'Corporate Events',
    description: 'Add a touch of culture to your corporate gatherings.',
    image: 'https://i.postimg.cc/htc1HhWp/Screenshot-2024-10-06-101737.png',
  },
  {
    title: 'Henna Tattoos',
    description: 'Temporary body art for a unique and stylish look.',
    image: 'https://i.postimg.cc/vZKD5Szf/Screenshot-2024-10-06-101849.png',
  },
];

const Services = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-green-800 mb-6">Our Services</h1>
      <p className="text-lg mb-8">Experience the art of henna with our professional services.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Book a Service</h2>
        <p className="mb-4">To book any of our services or for more information, please contact us:</p>
        <ul className="list-disc list-inside">
          <li>Phone: +91 8086647124</li>
          <li>Email: bookings@hennabyfathima.com</li>
        </ul>
      </div>
    </div>
  );
};

export default Services;
