import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-3xl font-bold text-green-800 mb-6">Contact Us</h1>
        <p className="mb-4">We'd love to hear from you! Get in touch with us for any inquiries or to book our services.</p>
        <div className="space-y-4">
          <p><strong>Address:</strong> Henna by Fathima Mehendi Studio, South Koduvally, Koduvally, Kozhikode, Kerala - 673572</p>
          <p><strong>Phone:</strong> +91 8086647124</p>
          <p><strong>Email:</strong> info@hennabyfathima.com</p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Business Hours</h2>
          <ul className="space-y-2">
            <li><strong>Monday - Saturday:</strong> 10:00 AM - 7:00 PM</li>
            <li><strong>Sunday:</strong> Closed</li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-green-800 mb-6">Send Us a Message</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2">Name</label>
            <Input type="text" id="name" placeholder="Your Name" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <Input type="email" id="email" placeholder="Your Email" />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2">Phone</label>
            <Input type="tel" id="phone" placeholder="Your Phone Number" />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2">Message</label>
            <Textarea id="message" placeholder="Your Message" rows={4} />
          </div>
          <Button type="submit">Send Message</Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;