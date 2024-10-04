import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CountdownTimer from '../components/CountdownTimer';

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
  // Set the target date to 4 months from now
  const targetDate = new Date();
  targetDate.setMonth(targetDate.getMonth() + 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-green-800 mb-6">Henna Workshops</h1>
      <div className="bg-cream-100 p-8 rounded-lg shadow-lg text-center mb-12">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Coming Soon!</h2>
        <p className="text-xl mb-6">Our workshops will be available in:</p>
        <CountdownTimer targetDate={targetDate} />
        <p className="mt-6 text-lg">Stay tuned for our exciting henna workshops where you can learn and enhance your skills!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-50 pointer-events-none">
        {workshops.map((workshop, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{workshop.title}</CardTitle>
              <CardDescription>{workshop.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Duration:</strong> {workshop.duration}</p>
              <p><strong>Price:</strong> {workshop.price}</p>
              <Button className="mt-4" disabled>Book Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12 opacity-50 pointer-events-none">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Custom Workshops</h2>
        <p className="mb-4">We also offer customized workshops for groups, events, and corporate team-building. Contact us for more information and pricing.</p>
        <Button disabled>Enquire About Custom Workshops</Button>
      </div>
    </div>
  );
};

export default Workshop;
