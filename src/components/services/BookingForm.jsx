import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const BookingForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Here you would typically send the data to your backend
      console.log('Form data:', data);
      toast.success('Booking request sent successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send booking request. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register('name', { required: 'Name is required' })}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          {...register('location', { required: 'Location is required' })}
          placeholder="Your location"
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact">Contact Number</Label>
        <Input
          id="contact"
          type="tel"
          {...register('contact', { 
            required: 'Contact number is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Please enter a valid 10-digit phone number'
            }
          })}
          placeholder="Your contact number"
        />
        {errors.contact && (
          <p className="text-red-500 text-sm">{errors.contact.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bookingType">Type of Booking</Label>
        <Select {...register('bookingType', { required: 'Please select booking type' })}>
          <SelectTrigger>
            <SelectValue placeholder="Select booking type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="party">Party Henna</SelectItem>
            <SelectItem value="bridal">Bridal Henna</SelectItem>
          </SelectContent>
        </Select>
        {errors.bookingType && (
          <p className="text-red-500 text-sm">{errors.bookingType.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date of Booking</Label>
        <Input
          id="date"
          type="date"
          {...register('date', { required: 'Date is required' })}
          min={new Date().toISOString().split('T')[0]}
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Additional Message</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Any special requirements or questions?"
          className="h-32"
        />
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default BookingForm;
