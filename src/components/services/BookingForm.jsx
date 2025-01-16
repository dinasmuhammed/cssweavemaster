import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const BookingForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      bookingType: '',
      date: new Date(),
    }
  });

  const date = watch('date');

  const onSubmit = (data) => {
    try {
      // Format the data for WhatsApp
      const message = `
New Booking Request:
Name: ${data.name}
Location: ${data.location}
Contact: ${data.contact}
Type: ${data.bookingType}
Date: ${format(data.date, 'PPP')}
Message: ${data.message || 'No additional message'}
      `.trim();

      // Encode the message for WhatsApp URL
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/918086647124?text=${encodedMessage}`;
      
      // Open WhatsApp in a new window
      window.open(whatsappUrl, '_blank');
      
      toast.success('Booking request prepared for WhatsApp!');
    } catch (error) {
      console.error('Error handling form submission:', error);
      toast.error('Failed to process booking request. Please try again.');
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
        <Select 
          onValueChange={(value) => setValue('bookingType', value)}
          {...register('bookingType', { required: 'Please select booking type' })}
        >
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
        <Label>Date of Booking</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => setValue('date', date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
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
        Submit via WhatsApp
      </Button>
    </form>
  );
};

export default BookingForm;