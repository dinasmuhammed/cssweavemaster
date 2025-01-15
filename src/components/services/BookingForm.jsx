import React from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const BookingForm = () => {
  const [date, setDate] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Booking request submitted successfully!");
      e.target.reset();
      setDate(undefined);
    } catch (error) {
      toast.error("Failed to submit booking request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h3 className="text-2xl font-bold text-green-800 mb-6">Request to Book</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" required className="mt-1" />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" required className="mt-1" />
        </div>

        <div>
          <Label htmlFor="contact">Contact Number</Label>
          <Input id="contact" type="tel" required className="mt-1" />
        </div>

        <div>
          <Label htmlFor="bookingType">Type of Booking</Label>
          <Select required>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select booking type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="party">Party Henna</SelectItem>
              <SelectItem value="bridal">Bridal Henna</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Date of Booking</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full mt-1 justify-start text-left font-normal",
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
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="message">Additional Message</Label>
          <Textarea id="message" className="mt-1" rows={4} />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit Booking Request"}
        </Button>
      </form>
    </motion.div>
  );
};

export default BookingForm;