import React from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const BookingForm = ({ isOpen, onClose, packageTitle }) => {
  const [date, setDate] = React.useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      address: formData.get('address'),
      budget: formData.get('budget'),
      date: date,
      package: packageTitle,
      message: formData.get('message')
    };

    // Here you would typically send this data to your backend
    console.log('Booking request:', data);
    toast.success("Booking request sent successfully!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book {packageTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name*</Label>
            <Input id="name" name="name" required />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number*</Label>
            <Input id="phone" name="phone" type="tel" required />
          </div>
          <div>
            <Label htmlFor="email">Email*</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="address">Address*</Label>
            <Textarea id="address" name="address" required />
          </div>
          <div>
            <Label htmlFor="budget">Budget (₹)*</Label>
            <Input id="budget" name="budget" type="number" min="0" required />
          </div>
          <div>
            <Label>Preferred Date*</Label>
            <DatePicker date={date} onDateChange={setDate} />
          </div>
          <div>
            <Label htmlFor="message">Additional Message</Label>
            <Textarea id="message" name="message" />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;