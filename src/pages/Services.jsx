import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = '918086647124';
    const message = `New Booking Request:%0A
Name: ${bookingForm.name}%0A
Phone: ${bookingForm.phone}%0A
Service: ${bookingForm.service}%0A
Message: ${bookingForm.message}`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

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
        <p className="mb-4">To book any of our services or for more information, please fill out the form below:</p>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={bookingForm.name} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" value={bookingForm.phone} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="service">Service</Label>
            <Input id="service" name="service" value={bookingForm.service} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" value={bookingForm.message} onChange={handleInputChange} />
          </div>
          <Button type="submit">Send Booking Request</Button>
        </form>
      </div>
    </div>
  );
};

export default Services;