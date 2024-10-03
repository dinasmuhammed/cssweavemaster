import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const workshops = [
  {
    title: 'Beginner Henna Workshop',
    description: 'Learn the basics of henna application and simple designs.',
    duration: '3 hours',
    price: '₹1,999',
  },
  {
    title: 'Advanced Bridal Henna Techniques',
    description: 'Master intricate bridal designs and advanced techniques.',
    duration: '6 hours',
    price: '₹3,999',
  },
  {
    title: 'Henna for Kids',
    description: 'A fun and interactive workshop for children to explore henna art.',
    duration: '2 hours',
    price: '₹999',
  },
  {
    title: 'Modern Henna Designs',
    description: 'Explore contemporary henna patterns and fusion styles.',
    duration: '4 hours',
    price: '₹2,499',
  },
];

const Workshop = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-green-800 mb-6">Henna Workshops</h1>
      <p className="text-lg mb-8">Join our expert-led workshops to enhance your henna skills and unleash your creativity.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {workshops.map((workshop, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{workshop.title}</CardTitle>
              <CardDescription>{workshop.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Duration:</strong> {workshop.duration}</p>
              <p><strong>Price:</strong> {workshop.price}</p>
              <Button className="mt-4">Book Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Custom Workshops</h2>
        <p className="mb-4">We also offer customized workshops for groups, events, and corporate team-building. Contact us for more information and pricing.</p>
        <Button>Enquire About Custom Workshops</Button>
      </div>
    </div>
  );
};

export default Workshop;