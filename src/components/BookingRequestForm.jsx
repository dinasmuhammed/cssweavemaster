import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

const BookingRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    budget: '',
    date: new Date(),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mvgonojq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          date: format(formData.date, 'PPP')
        })
      });

      if (response.ok) {
        toast.success("Booking request submitted successfully!");
        setFormData({
          name: '',
          address: '',
          budget: '',
          date: new Date(),
        });
        setIsOpen(false);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast.error("Failed to submit booking request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Request to Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-green-800">Book Your Service</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-semibold">Name</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address" className="font-semibold">Address</Label>
            <Input
              id="address"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="budget" className="font-semibold">Budget</Label>
            <Input
              id="budget"
              required
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full"
              placeholder="Enter amount in ₹"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="font-semibold">Preferred Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => setFormData({ ...formData, date: date || new Date() })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingRequestForm;
